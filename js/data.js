"use strict";

const loadSeasonData = (() => {
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1KloxtYkffp7uAua6J3q4vwwSP2wAH-2YrwFWhX0dOTo/gviz/tq";
  let requestNumber = 0;

  // The Visualization API supports script callbacks, including on pages opened via file://.
  function readSheet(sheet, range, headers) {
    return new Promise((resolve, reject) => {
      const callback = "cxbiathlonSheet" + (++requestNumber);
      const url = new URL(spreadsheetUrl);
      url.search = new URLSearchParams({
        sheet, range, headers: "1",
        tqx: "out:json;responseHandler:" + callback,
        refresh: String(Date.now())
      });

      const script = document.createElement("script");
      const finish = () => {
        clearTimeout(timeout);
        delete window[callback];
        script.remove();
      };
      const fail = () => {
        finish();
        reject(new Error("Не удалось прочитать лист " + sheet));
      };
      const timeout = setTimeout(fail, 12000);

      window[callback] = ({ status, table }) => {
        if (status !== "ok" || !Array.isArray(table?.rows) ||
            !headers.every((header, index) => table.cols?.[index]?.label === header)) {
          fail();
          return;
        }
        finish();
        resolve(table.rows.map(({ c }) => headers.map((_, index) => c?.[index]?.v ?? null)));
      };
      script.onerror = fail;
      script.onload = () => { if (window[callback]) fail(); };
      script.src = url.href;
      document.head.append(script);
    });
  }

  function integer(value, minimum = 0) {
    const number = Number(value);
    if (value == null || value === "" || !Number.isSafeInteger(number) || number < minimum) {
      throw new Error("Некорректное число в Google Таблице");
    }
    return number;
  }

  function timeInTenths(value) {
    if (value == null || value === "") return null;
    // Sheets durations can arrive as fractions of a day or as time-of-day arrays.
    if (typeof value === "number") return Math.round(value * 864000);
    if (Array.isArray(value)) {
      const [hours, minutes, seconds, milliseconds = 0] = value;
      return Math.round(hours * 36000 + minutes * 600 + seconds * 10 + milliseconds / 100);
    }
    const match = /^(?:(\d+):)?(\d+):([0-5]\d)(?:[.,](\d+))?$/.exec(String(value).trim());
    if (!match) throw new Error("Некорректное время в Google Таблице");
    const [, hours = "0", minutes, seconds, fraction = "0"] = match;
    return Math.round(Number(hours) * 36000 + Number(minutes) * 600 +
      Number(seconds + "." + fraction) * 10);
  }

  return async function () {
    const [raceRows, resultRows, participantRows, countryRows, pointRows] = await Promise.all([
      readSheet("races", "A:C", ["#", "Этап", "Гонка"]),
      readSheet("results", "A:K", ["#", "Место", "Номер", "Страна", "№ участника", "С1", "С2", "С3", "С4", "Время", "Время ходом"]),
      readSheet("participants", "A:B", ["Номер", "Участник"]),
      readSheet("countries", "A:C", ["Код", "Флаг", "Страна"]),
      readSheet("points", "A:B", ["Место", "Очки"])
    ]);

    const races = new Map();
    for (const [id, venue, name] of raceRows) {
      if (!id || !venue || !name) continue;
      const raceId = integer(id, 1);
      races.set(raceId, { id: raceId, venue: String(venue), name: String(name), entries: [] });
    }

    const participants = new Map();
    for (const [id, name] of participantRows) {
      if (id && name) participants.set(integer(id, 1), String(name));
    }

    const countriesByCode = Object.create(null);
    for (const [code, flag, name] of countryRows) {
      if (code && name) countriesByCode[code] = { flag, name: String(name) };
    }

    const pointsByPlace = [];
    for (const [place, points] of pointRows) {
      if (place && points != null && points !== "") pointsByPlace[integer(place, 1)] = integer(points);
    }

    for (const [raceId, place, , country, participantId, first, second, third, fourth, finish, ski] of resultRows) {
      if (!place) continue;
      const race = races.get(integer(raceId, 1));
      const name = participants.get(integer(participantId, 1));
      if (!race || !name || !country) throw new Error("Неполная строка на листе results");
      const shooting = [first, second, third, fourth]
        .filter(value => value != null && value !== "").map(value => integer(value));
      race.entries.push({
        rank: integer(place, 1), country: String(country), name, shooting,
        time: timeInTenths(finish), skiTime: timeInTenths(ski), gap: null
      });
    }

    for (const { entries } of races.values()) {
      entries.sort((a, b) => a.rank - b.rank);
      const winnerTime = entries[0]?.time;
      for (const row of entries) {
        if (winnerTime != null && row.time != null) row.gap = row.time - winnerTime;
      }
    }

    return { races: [...races.values()], pointsByPlace, countriesByCode };
  };
})();
