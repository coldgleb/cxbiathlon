"use strict";
const byId = id => document.getElementById(id);
const escapeText = value => String(value).replace(/[&<>"']/g, character =>
  ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[character]
);
const formatTime = ticks => {
  const minutes = Math.floor(ticks / 600);
  const seconds = String(Math.floor(ticks / 10) % 60).padStart(2, "0");
  return minutes + ":" + seconds + "," + ticks % 10;
};
const gapLabel = row => !row.gap ? "—" : "+" + formatTime(row.gap);
const misses = row => row.shooting.reduce((sum, value) => sum + value, 0);
const countryName = code => countriesByCode[code]?.name ?? code;
const athleteKey = row => JSON.stringify([row.name, row.country]);
const profileLink = (kind, key, label, attributes = "") =>
  '<button type="button" class="profile-link" data-profile="' + kind + '" data-key="' +
  escapeText(key) + '"' + attributes + '>' + label + '</button>';
const athleteLink = row => profileLink("athlete", athleteKey(row), escapeText(row.name));
const countryCell = (code, showName = false) => {
  const country = countriesByCode[code];
  const name = escapeText(countryName(code));
  const flag = country?.flag ? '<span class="country-flag" aria-hidden="true">' + escapeText(country.flag) + '</span>' : "";
  return profileLink("nation", code, '<span class="country">' + flag +
    (showName || !flag ? ' ' + name : '') + '</span>', ' title="' + name + '" aria-label="' + name + '"');
};
const search = byId("search");
const standingsSearch = byId("standings-search");
const standingsRaceSelect = byId("standings-race-select");
const standingsRaceLabel = byId("standings-race-label");
function showSelectedStandingsRace() {
  standingsRaceLabel.textContent = standingsRaceSelect.selectedOptions[0].textContent;
}
const normalizeSearch = value => value.toLocaleLowerCase("ru").trim().replaceAll("ё", "е");
const matchesSearch = (row, query) =>
  normalizeSearch(row.name + " " + row.country + " " + countryName(row.country)).includes(query);
const stageSelect = byId("stage-select");
let stages;
const raceHash = race => "#race-" + race.id;
let current;
let activeSection;
let races, pointsByPlace, countriesByCode, completedRaces;
const raceAbbreviations = new Map([
  ["Спринт", "С"],
  ["Гонка преследования", "ГП"],
  ["Индивидуальная гонка", "ИГ"],
  ["Масс-старт", "МС"]
]);
const raceAbbreviation = name => raceAbbreviations.get(name) ??
  name.trim().split(/[\s-]+/).map(word => word.charAt(0)).join("").toLocaleUpperCase("ru");
const seasonRaceColumns = byId("season-race-columns");

function groupRacesByStage(calendar) {
  const groups = new Map();
  for (const race of calendar) {
    if (!groups.has(race.venue)) groups.set(race.venue, []);
    groups.get(race.venue).push(race);
  }
  return groups;
}

function updateSeasonData(data) {
  ({ races, pointsByPlace, countriesByCode } = data);
  stages = groupRacesByStage(races);
  stageSelect.innerHTML = [...stages.keys()].map(venue =>
    '<option value="' + escapeText(venue) + '">' + escapeText(venue) + '</option>'
  ).join("");
  const selectedRace = standingsRaceSelect.value;
  standingsRaceSelect.innerHTML = '<option value="">Текущий зачёт</option>' + races.map(race =>
    '<option value="' + race.id + '">' + escapeText(race.venue + " - " + race.name) + '</option>'
  ).join("");
  standingsRaceSelect.value = races.some(race => String(race.id) === selectedRace) ? selectedRace : "";
  standingsRaceSelect.disabled = !races.length;
  showSelectedStandingsRace();

  const entries = races.flatMap(race => race.entries);
  completedRaces = races.filter(race => race.entries.length > 0);
  byId("season-summary").innerHTML = [
    ["Этапы", stages.size],
    ["Гонки", completedRaces.length],
    ["Участники", new Set(entries.map(athleteKey)).size],
    ["Страны", new Set(entries.map(row => row.country)).size]
  ].map(([label, value]) => '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>').join("");
  renderPage();
}

function getStandingsRaces() {
  const index = races.findIndex(race => String(race.id) === standingsRaceSelect.value);
  return index < 0 ? races : races.slice(0, index + 1);
}

function renderStandingsRaceColumns(raceGroups, raceCount) {
  const seasonTable = seasonRaceColumns.closest("table");
  seasonTable.style.setProperty("--race-count", raceCount);
  for (const group of seasonTable.querySelectorAll(".season-race-group")) group.remove();
  seasonRaceColumns.insertAdjacentHTML("beforebegin", [...raceGroups.values()].map(stageRaces =>
    '<colgroup class="season-race-group"><col class="race-finish-column" span="' + stageRaces.length + '"></colgroup>'
  ).join(""));
  return [...raceGroups].map(([venue, stageRaces]) =>
    '<th scope="colgroup" class="race-result race-stage-start" colspan="' + stageRaces.length + '">' +
    '<span class="race-stage-name" title="' + escapeText(venue) + '">' + escapeText(venue) + '</span></th>'
  ).join("") + '</tr><tr>' +
    [...raceGroups.values()].flatMap(stageRaces => stageRaces.map((race, index) => {
      const abbreviation = raceAbbreviation(race.name);
      return '<th scope="col" class="race-result' + (index === 0 ? ' race-stage-start' : '') +
        '" aria-label="' + escapeText(race.venue + " — " + race.name) + '" title="' +
        escapeText(race.name) + '">' + escapeText(abbreviation) + '</th>';
    })).join("") + '</tr>';
}

const refreshButton = byId("refresh-data");
const refreshStatus = byId("refresh-status");
refreshButton.hidden = false;
async function refreshSeasonData(showConfirmation = false) {
  if (refreshButton.disabled) return;
  refreshButton.disabled = true;
  refreshStatus.textContent = "Загружаем данные из Google Таблицы…";
  try {
    updateSeasonData(await loadSeasonData());
    refreshStatus.textContent = showConfirmation ? "Данные обновлены." : "";
  } catch (error) {
    console.error(error);
    refreshStatus.textContent = "Не удалось загрузить данные из Google Таблицы. Попробуйте ещё раз.";
  } finally {
    refreshButton.disabled = false;
  }
}
refreshButton.addEventListener("click", () => refreshSeasonData(true));

const themeButton = byId("theme-button");
function setTheme(light) {
  document.documentElement.dataset.theme = light ? "light" : "dark";
  themeButton.setAttribute("aria-pressed", String(light));
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
}
try {
  setTheme(localStorage.getItem("cxbiathlon-theme") === "light");
} catch {
  setTheme(false);
}
themeButton.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme !== "light";
  setTheme(light);
  try { localStorage.setItem("cxbiathlon-theme", light ? "light" : "dark"); } catch {}
});

const wideResultsButton = byId("wide-results-button");
function setWideResults(wide) {
  document.documentElement.dataset.wideResults = String(wide);
  wideResultsButton.setAttribute("aria-pressed", String(wide));
}
try {
  setWideResults(localStorage.getItem("cxbiathlon-wide-results") === "true");
} catch {
  setWideResults(false);
}
wideResultsButton.addEventListener("click", () => {
  const wide = document.documentElement.dataset.wideResults !== "true";
  setWideResults(wide);
  try { localStorage.setItem("cxbiathlon-wide-results", String(wide)); } catch {}
});
wideResultsButton.hidden = false;

function getRaceScores(race, byNation) {
  const raceScores = new Map();
  for (const row of race.entries) {
    const name = byNation ? countryName(row.country) : row.name;
    const key = byNation ? row.country : athleteKey(row);
    const points = pointsByPlace[row.rank] ?? 0;
    const best = raceScores.get(key);
    if (!best || points > best.points || (points === best.points && row.rank < best.finish)) {
      raceScores.set(key, { name, country: row.country, points, finish: row.rank, row });
    }
  }
  return raceScores;
}

function compareStandings(a, b) {
  if (a.points !== b.points) return b.points - a.points;
  for (let index = 0; index < Math.min(a.finishes.length, b.finishes.length); index++) {
    if (a.finishes[index] !== b.finishes[index]) return a.finishes[index] - b.finishes[index];
  }
  return b.finishes.length - a.finishes.length;
}

function getStandings(byNation, countedRaces) {
  const totals = new Map();
  for (const race of countedRaces) {
    for (const [key, score] of getRaceScores(race, byNation)) {
      if (!totals.has(key)) totals.set(key, { ...score, key, points: 0, finishes: [] });
      const total = totals.get(key);
      total.points += score.points;
      total.finishes.push(score.finish);
    }
  }
  const scores = [...totals.values()];
  for (const score of scores) score.finishes.sort((a, b) => a - b);
  scores.sort((a, b) =>
    compareStandings(a, b) || a.name.localeCompare(b.name, "ru") || a.country.localeCompare(b.country)
  );
  let rank = 0;
  return scores.map((row, index) => {
    if (!index || compareStandings(row, scores[index - 1])) rank = index + 1;
    return { ...row, rank };
  });
}

function finishBadge(place) {
  const tone = place === 1 ? "gold" : place === 2 ? "silver" : place === 3 ? "bronze" :
    place <= 8 ? "green" : place <= 20 ? "purple" : "deep-purple";
  return '<span class="finish-place finish-' + tone + '">' + place + '</span>';
}

const prizeByPlace = [60, 55, 50, 40, 40, 40, 35, 35, 35, 35, 30, 30, 30, 30, 30];

function renderStandings(byNation) {
  const countedRaces = getStandingsRaces();
  const raceGroups = countedRaces === races ? stages : groupRacesByStage(countedRaces);
  const scores = getStandings(byNation, countedRaces);
  const query = normalizeSearch(standingsSearch.value);
  const raceScores = [...raceGroups.values()].flatMap(stageRaces =>
    stageRaces.map((race, index) => ({
      scores: getRaceScores(race, byNation),
      stageStart: index === 0
    }))
  );
  const priorRaces = (countedRaces === races ? completedRaces : countedRaces).slice(0, -1);
  const previousRanks = new Map(
    getStandings(byNation, priorRaces).map(row => [row.key, row.rank])
  );
  const raceStageHeaders = renderStandingsRaceColumns(raceGroups, countedRaces.length);
  seasonRaceColumns.closest("table").classList.toggle("nations-table", byNation);
  byId("standings-base-columns").innerHTML = '<col class="race-rank-column"><col class="race-movement-column"><col>' +
    (byNation ? '' : '<col class="race-country-column">') +
    '<col class="race-points-column"><col class="race-gap-column" span="2">' +
    (byNation ? '' : '<col class="race-prize-column">') + '<col class="race-best-column">';
  seasonRaceColumns.innerHTML = '<tr><th scope="col" rowspan="2" aria-label="Место">Номер</th>' +
    '<th scope="col" rowspan="2" aria-label="Изменение места">±</th>' +
    (byNation ? ["Страна", "Очки"] : ["Участник", "Страна", "Очки"])
      .map(label => '<th scope="col" rowspan="2">' + label + '</th>').join("") +
    '<th scope="col" rowspan="2" colspan="2" class="race-result">ОТСТАВАНИЕ</th>' +
    (byNation ? '' : '<th scope="col" rowspan="2" class="race-result">Призовые</th>') +
    '<th scope="col" rowspan="2" class="race-result">Лучший<br>финиш</th>' + raceStageHeaders;
  byId("standings-title").textContent = byNation ? "Лига Наций" : "Результаты гонок";
  standingsSearch.placeholder = byNation ? "Название страны" : "Имя или страна";
  byId("standings-empty").hidden = scores.length > 0;
  const rows = scores.flatMap((row, index) => {
    if (!matchesSearch(row, query)) return [];
    const country = countryCell(row.country, byNation);
    const priorRank = previousRanks.get(row.key);
    const change = priorRank == null ? null : priorRank - row.rank;
    const movement = change > 0 ? "▲" + change : change < 0 ? "▼" + Math.abs(change) : "—";
    const movementClass = change > 0 ? " gain" : change < 0 ? " loss" : "";
    const leaderGap = index ? row.points - scores[0].points : "—";
    const previousGap = index ? row.points - scores[index - 1].points : "—";
    const finishes = raceScores.map(({ scores, stageStart }) => ({ place: scores.get(row.key)?.finish, stageStart }));
    const bestFinish = Math.min(...finishes.map(({ place }) => place ?? Infinity));
    const prizeCell = byNation ? '' : '<td class="num race-result">' +
      finishes.reduce((sum, { place }) => place == null ? sum : sum + (prizeByPlace[place - 1] ?? 25), 0) + '$</td>';
    const summary = '<tr><td><span class="place p' + row.rank + '">' + row.rank + '</span></td>' +
      '<td class="num' + movementClass + '" aria-label="' +
      (change == null ? "Нет предыдущего места" : change > 0 ? "+" + change : change) + '">' + movement + '</td>' +
      (byNation ? '<th scope="row">' + country + '</th>'
        : '<th scope="row">' + athleteLink(row) + '</th><td>' + country + '</td>') +
      '<td class="num points"><strong>' + row.points + '</strong></td>' +
      '<td class="num race-result"><span class="sr-only">До лидера: </span>' + leaderGap + '</td>' +
      '<td class="num race-result"><span class="sr-only">До предыдущего: </span>' + previousGap + '</td>' +
      prizeCell +
      '<td class="num race-result">' + finishBadge(bestFinish) + '</td>';
    return summary + finishes.map(({ place, stageStart }) => {
      const classes = 'num race-result' + (stageStart ? ' race-stage-start' : '');
      if (place == null) return '<td class="' + classes + ' race-result-empty">—</td>';
      return '<td class="' + classes + '">' + finishBadge(place) + '</td>';
    }).join("") + '</tr>';
  });
  const tableRows = byId("season-race-rows");
  tableRows.innerHTML = rows.join("");
  tableRows.closest(".table-scroll").hidden = !rows.length;
  byId("standings-no-match").hidden = !scores.length || rows.length > 0;
}

function renderPage() {
  const hash = location.hash;
  const section = hash === "#stages" || hash.startsWith("#race-")
    ? "stages" : hash === "#nations" ? "nations" : "overall";
  if (activeSection !== section) {
    standingsSearch.value = "";
    byId("season-race-rows").closest(".table-scroll").scrollLeft = 0;
  }
  activeSection = section;
  for (const link of document.querySelectorAll("[data-section]")) {
    if (link.dataset.section === section) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  byId("stage-results").hidden = section !== "stages";
  byId("standings").hidden = section === "stages";
  if (section === "stages") renderRace();
  else renderStandings(section === "nations");
}

const raceViews = {
  finish: { title: "Финишный протокол", columns: ["Промахи", "Отставание", "Время"] },
  ski: { title: "Лыжный ход", columns: ["Время ходом", "Отставание"] },
  shoot: { title: "Стрельба" }
};
let view = "finish";
let tableRows = [];
const raceSelect = byId("race-select");
const viewButtons = document.querySelectorAll("[data-view]");
const displayTime = ticks => ticks == null ? "—" : formatTime(ticks);

const profile = byId("profile");
const profileNumber = new Intl.NumberFormat("ru", { maximumFractionDigits: 1 });
const placeLabel = rank => rank == null ? "—" : "#" + rank;

function profileChart(history, byNation) {
  const width = 640;
  const left = 38;
  const right = 602;
  const top = 20;
  const bottom = 160;
  const maxRank = Math.max(2, ...history.map(item => item.rank ?? 1));
  const tickStep = Math.ceil((maxRank - 1) / 5);
  const y = rank => top + (bottom - top) * (rank - 1) / (maxRank - 1);
  const points = history.map((item, index) => ({
    ...item,
    number: index + 1,
    x: history.length === 1 ? (left + right) / 2 : left + (right - left) * index / (history.length - 1)
  }));
  const ticks = [];
  for (let rank = 1; rank <= maxRank; rank += tickStep) ticks.push(rank);
  if (maxRank - ticks.at(-1) >= tickStep / 2) ticks.push(maxRank);
  const ranked = points.filter(item => item.rank != null);
  const labelStep = Math.ceil(points.length / 9);
  const title = byNation ? "Место в Лиге Наций после гонки" : "Место в общем зачёте после гонки";
  return '<section class="profile-chart"><h3>' + title + '</h3>' +
    '<svg viewBox="0 0 ' + width + ' 190" role="group" aria-label="' + title + '">' +
    ticks.map(rank => '<line x1="' + left + '" x2="' + right + '" y1="' + y(rank) + '" y2="' + y(rank) +
      '"/><text x="28" y="' + (y(rank) + 4) + '" text-anchor="end">' + rank + '</text>').join("") +
    points.filter(item => (item.number - 1) % labelStep === 0).map(({ race, x }) => {
      const label = race.venue.slice(0, 3).toLocaleUpperCase("ru") + " · " + raceAbbreviation(race.name);
      return '<line x1="' + x + '" x2="' + x + '" y1="' + top + '" y2="' + bottom +
        '"/><text x="' + x + '" y="181" text-anchor="middle">' + escapeText(label) + '</text>';
    }).join("") +
    '<polyline points="' + ranked.map(item => item.x + "," + y(item.rank)).join(" ") + '"/>' +
    ranked.map(item => {
      const race = escapeText(item.race.venue + " · " + item.race.name);
      return '<g class="chart-point" tabindex="0" role="img" data-race="' + race + '" data-rank="' + item.rank +
        '" aria-label="' + race + ', ' + item.rank + '-е место">' +
        '<circle class="chart-hit" cx="' + item.x + '" cy="' + y(item.rank) + '" r="19"/>' +
        '<circle class="chart-dot" cx="' + item.x + '" cy="' + y(item.rank) + '" r="4"/></g>';
    }).join("") +
    '</svg><div class="chart-tooltip" aria-hidden="true" hidden><strong></strong><span></span></div></section>';
}

function enableChartTooltips(chart) {
  const tooltip = chart.querySelector(".chart-tooltip");
  let hovered = null;
  let focused = null;
  function updateTooltip() {
    const point = hovered || focused;
    tooltip.hidden = !point;
    if (!point) return;
    tooltip.firstElementChild.textContent = point.dataset.race;
    tooltip.lastElementChild.textContent = point.dataset.rank + "-е место";
    const chartRect = chart.getBoundingClientRect();
    const dot = point.querySelector(".chart-dot").getBoundingClientRect();
    const x = dot.left + dot.width / 2 - chartRect.left;
    const y = dot.top + dot.height / 2 - chartRect.top;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const left = x + width + 18 <= chart.clientWidth ? x + 10 : x - width - 10;
    tooltip.style.left = Math.max(8, left) + "px";
    tooltip.style.top = Math.max(8, Math.min(y - height / 2, chart.clientHeight - height - 8)) + "px";
  }
  for (const point of chart.querySelectorAll(".chart-point")) {
    point.addEventListener("pointerenter", () => { hovered = point; updateTooltip(); });
    point.addEventListener("pointerleave", () => { hovered = null; updateTooltip(); });
    point.addEventListener("focus", () => { focused = point; updateTooltip(); });
    point.addEventListener("blur", () => { focused = null; updateTooltip(); });
    point.addEventListener("click", () => point.focus());
  }
}

function openProfile(kind, key) {
  const byNation = kind === "nation";
  const profileRaces = activeSection === "stages" ? completedRaces : getStandingsRaces().filter(race => race.entries.length);
  const total = getStandings(byNation, profileRaces).find(row => row.key === key);
  if (!total) return;
  let runningPoints = 0;
  const history = profileRaces.map((race, index) => {
    const score = getRaceScores(race, byNation).get(key);
    const rank = getStandings(byNation, profileRaces.slice(0, index + 1)).find(row => row.key === key)?.rank;
    runningPoints += score?.points ?? 0;
    return { race, score, rank, runningPoints };
  });
  const starts = history.filter(item => item.score);
  const athletes = new Map(profileRaces.flatMap(race => race.entries)
    .filter(row => row.country === total.country).map(row => [athleteKey(row), row]));
  const metrics = [
    ["Место", placeLabel(total.rank)],
    ["Очки", total.points],
    ["Гонки", total.finishes.length + " / " + profileRaces.length],
    ["Лучший финиш", placeLabel(total.finishes[0])],
    ["Победы", starts.filter(item => item.score.finish === 1).length],
    byNation ? ["Участники", athletes.size] : ["Средний финиш",
      profileNumber.format(starts.reduce((sum, item) => sum + item.score.finish, 0) / starts.length)]
  ];
  const columns = byNation ? ["Финиш", "Кто принёс очки", "Очки", "В гонке", "Всего", "В зачёте"]
    : ["Финиш", "Время", "Отставание", "Промахи", "Очки", "В зачёте"];
  byId("profile-title").textContent = total.name;
  byId("profile-subtitle").innerHTML = byNation
    ? [...athletes.values()].map(athleteLink).join(" · ")
    : countryCell(total.country, true);
  byId("profile-body").innerHTML =
    '<dl class="profile-metrics">' + metrics.map(([label, value]) =>
      '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>').join("") + '</dl>' +
    profileChart(history, byNation) +
    '<div class="table-scroll" tabindex="0" role="region" aria-label="Результаты по гонкам">' +
    '<table><thead><tr><th scope="col">Гонка</th>' +
    columns.map(label => '<th scope="col">' + label + '</th>').join("") + '</tr></thead><tbody>' +
    history.map(({ race, score, rank, runningPoints }, index) => {
      const raceRank = byNation && score ? getStandings(true, [race]).find(row => row.key === key).rank : null;
      const values = byNation
        ? [placeLabel(score?.finish), score ? athleteLink(score.row) : "—", score?.points ?? "—",
          placeLabel(raceRank), rank == null ? "—" : runningPoints, placeLabel(rank)]
        : [placeLabel(score?.finish), displayTime(score?.row.time), score ? gapLabel(score.row) : "—",
          score ? misses(score.row) : "—", score?.points ?? "—", placeLabel(rank)];
      return '<tr><th scope="row"><a class="profile-link" href="' + raceHash(race) + '">' +
        (index + 1) + ' · ' + escapeText(race.venue) + '</a><small>' + escapeText(race.name) + '</small></th>' +
        values.map(value => '<td class="num">' + value + '</td>').join("") + '</tr>';
    }).join("") + '</tbody></table></div>';
  profile.classList.toggle("nation-profile", byNation);
  enableChartTooltips(profile.querySelector(".profile-chart"));
  if (!profile.open) profile.showModal();
  else profile.querySelector(".profile-close").focus();
  profile.scrollTop = 0;
}

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-profile]");
  if (trigger) openProfile(trigger.dataset.profile, trigger.dataset.key);
  if (event.target.closest("a.profile-link")) profile.close();
});
profile.addEventListener("click", event => {
  if (event.target !== profile) return;
  const bounds = profile.getBoundingClientRect();
  if (event.clientX < bounds.left) profile.close();
});

function renderTable() {
  const query = normalizeSearch(search.value);
  const shown = tableRows.filter(row => matchesSearch(row, query));
  byId("no-match").hidden = shown.length > 0;
  byId("rows").closest(".table-scroll").hidden = !shown.length;
  byId("rows").innerHTML = shown.map(row =>
    '<tr' + (row.place != null && row.place <= 8 ? ' class="top-eight"' : '') + '><td>' +
    (row.place == null ? '—' : '<span class="place p' + row.place + '">' + row.place + '</span>') + '</td>' +
    '<th scope="row">' + athleteLink(row) + '</th>' +
    '<td>' + countryCell(row.country) + '</td>' +
    row.metrics.map(value => '<td class="num">' + value + '</td>').join("") + '</tr>'
  ).join("");
}

function renderRaceView() {
  byId("rows").closest(".table-scroll").scrollLeft = 0;
  for (const button of viewButtons) button.setAttribute("aria-pressed", String(button.dataset.view === view));
  const { entries } = current;
  const withSkiTimes = entries.filter(row => row.skiTime != null);
  const message = !entries.length ? "В исходной таблице пока нет финишного протокола этой гонки."
    : view === "ski" && !withSkiTimes.length ? "В исходной таблице нет времени лыжного хода для этой гонки." : "";
  byId("race-empty").textContent = message;
  byId("race-empty").hidden = !message;
  byId("protocol").hidden = Boolean(message);
  if (message) return;

  const labels = raceViews[view];
  let columns = labels.columns;
  if (view === "finish") {
    tableRows = entries.map(row => ({
      ...row, place: row.rank, metrics: [misses(row), gapLabel(row), displayTime(row.time)]
    }));
  } else if (view === "ski") {
    const sorted = withSkiTimes.sort((a, b) => a.skiTime - b.skiTime || a.rank - b.rank);
    tableRows = sorted.map((row, index) => ({
      ...row, place: index + 1,
      metrics: [displayTime(row.skiTime), gapLabel({gap: row.skiTime - sorted[0].skiTime})]
    }));
  } else {
    const rounds = Math.max(...entries.map(row => row.shooting.length));
    columns = [...Array.from({length: rounds}, (_, i) => "Рубеж " + (i + 1)), "Промахи", "Вне лыжного хода"];
    tableRows = [...entries].sort((a, b) => misses(a) - misses(b) || a.rank - b.rank).map((row, index) => ({
      ...row, place: index + 1,
      metrics: [
        ...Array.from({length: rounds}, (_, i) => row.shooting[i] ?? "—"), misses(row),
        displayTime(row.skiTime == null || row.time == null || row.skiTime > row.time ? null : row.time - row.skiTime)
      ]
    }));
  }
  byId("protocol-title").textContent = (view === "finish" ? current.name : labels.title) + " — " + current.venue;
  const metricColumns = byId("race-metric-columns");
  metricColumns.span = columns.length;
  metricColumns.closest("table").style.setProperty("--race-metric-count", columns.length);
  byId("columns").innerHTML = '<tr><th scope="col" aria-label="Место">Номер</th>' + ["Участник", "Страна", ...columns]
    .map(label => '<th scope="col"' + (label === "Вне лыжного хода"
      ? ' title="Финишное время минус время ходом. Разница может включать штрафы."' : '') +
      '>' + label + '</th>').join("") + '</tr>';
  renderTable();
}

function renderRace() {
  const previous = current;
  current = races.find(race => location.hash === raceHash(race)) ||
    races.find(race => race.id === previous?.id) || races[0];
  if (!current) {
    stageSelect.disabled = raceSelect.disabled = true;
    byId("race-views").hidden = true;
    byId("protocol").hidden = true;
    byId("race-empty").hidden = false;
    byId("race-empty").textContent = "Программа этапов пока пуста.";
    return;
  }
  stageSelect.disabled = raceSelect.disabled = false;
  byId("race-views").hidden = false;
  const stageRaces = stages.get(current.venue);
  stageSelect.value = current.venue;
  if (previous !== current) {
    raceSelect.innerHTML = stageRaces.map(race =>
      '<option value="' + race.id + '">' + escapeText(race.name) + '</option>'
    ).join("");
  }
  raceSelect.value = String(current.id);
  if (previous?.id !== current.id) search.value = "";
  renderRaceView();
}

search.addEventListener("input", renderTable);
standingsSearch.addEventListener("input", () => renderStandings(activeSection === "nations"));
standingsRaceSelect.addEventListener("change", () => {
  showSelectedStandingsRace();
  renderStandings(activeSection === "nations");
});
stageSelect.addEventListener("change", () => {
  const [firstRace] = stages.get(stageSelect.value);
  location.hash = raceHash(firstRace);
});
raceSelect.addEventListener("change", () => {
  location.hash = "#race-" + raceSelect.value;
});
for (const button of viewButtons) {
  button.addEventListener("click", () => {
    view = button.dataset.view;
    renderRaceView();
  });
}
window.addEventListener("hashchange", renderPage);
const tableObserver = new ResizeObserver(entries => {
  for (const { target } of entries) {
    const scroll = target.closest(".table-scroll");
    byId(scroll.getAttribute("aria-describedby")).hidden =
      !scroll.clientWidth || scroll.scrollWidth <= scroll.clientWidth + 1;
  }
});
for (const scroll of document.querySelectorAll(".table-scroll")) {
  tableObserver.observe(scroll);
  tableObserver.observe(scroll.querySelector("table"));
}
updateSeasonData({ races: [], pointsByPlace: [], countriesByCode: {} });
refreshSeasonData();
