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
const countFormat = new Intl.PluralRules("ru");
const finishers = count => count + " " + ({one:"финишировавший",few:"финишировавших",many:"финишировавших",other:"финишировавшего"})[countFormat.select(count)];
const gapLabel = row => row.gap === 0 ? "—" : "+" + formatTime(row.gap);
const misses = row => row.shooting.reduce((sum, value) => sum + value, 0);
const search = byId("search");
let current;

byId("race-nav").innerHTML = races.map(race =>
  '<a href="#race-' + race.id + '" data-race="' + race.id + '">' + escapeText(race.name) + '</a>'
).join("");

function renderTable() {
  const query = search.value.toLocaleLowerCase("ru").trim().replaceAll("ё","е");
  const shown = current.entries.filter(row =>
    (row.name + " " + row.country).toLocaleLowerCase("ru").replaceAll("ё","е").includes(query)
  );
  byId("row-count").textContent = query ? "Показано " + shown.length + " из " + current.entries.length : finishers(current.entries.length);
  byId("no-match").hidden = shown.length > 0;
  byId("rows").innerHTML = shown.map(row =>
    '<tr><td><span class="place p' + row.rank + '">' + row.rank + '</span></td>' +
    '<th scope="row">' + escapeText(row.name) + '</th><td><span class="country">' + escapeText(row.country) + '</span></td>' +
    '<td class="num">' + formatTime(row.time) + '</td><td class="num gap">' + gapLabel(row) + '</td>' +
    '<td class="num" title="Промахи по рубежам ' + row.shooting.join(" / ") + '">' + misses(row) +
    '<small class="splits">' + row.shooting.join(" · ") + '</small></td></tr>'
  ).join("");
}

function renderRace() {
  current = races.find(race => location.hash === "#race-" + race.id) || races[0];
  document.querySelectorAll("[data-race]").forEach(link => {
    if (Number(link.dataset.race) === current.id) link.setAttribute("aria-current","true");
    else link.removeAttribute("aria-current");
  });
  byId("race-number").textContent = "Гонка " + current.id + " из " + races.length;
  byId("race-title").textContent = current.name;
  const entries = current.entries;
  byId("race-status").textContent = entries.length ? "Есть результаты" : "Ожидает протокола";
  byId("protocol").hidden = entries.length === 0;
  search.value = "";
  if (!entries.length) {
    byId("overview").innerHTML = '<section class="panel empty-race"><h3>Результаты пока отсутствуют</h3><p>Индивидуальная гонка есть в программе этапа. В исходной таблице её финишный протокол пока пуст.</p></section>';
    return;
  }
  const leader = entries[0];
  const leaders = entries.slice(0, 8);
  const scale = Math.max(...leaders.map(row => row.gap), 1);
  byId("overview").innerHTML =
    '<div class="stats"><div><span>Победитель</span><strong>' + escapeText(leader.name) + '</strong></div>' +
    '<div><span>Время победителя</span><strong class="accent">' + formatTime(leader.time) + '</strong></div>' +
    '<div><span>Финишировавшие</span><strong>' + entries.length + '</strong></div></div>' +
    '<div class="overview-grid"><section class="panel"><div class="panel-heading"><h3>Подиум</h3></div><ol class="podium">' +
    entries.slice(0,3).map(row => '<li><span class="place p' + row.rank + '">' + row.rank + '</span>' +
      '<div><strong>' + escapeText(row.name) + '</strong><small>' + escapeText(row.country) +
      ' · Промахи ' + misses(row) + '</small></div><b>' + formatTime(row.time) + '</b></li>').join("") +
    '</ol></section><section class="panel chart"><div class="panel-heading"><h3>Отставание от лидера</h3><p>Первые ' + leaders.length + ' по финишному протоколу</p></div><ol class="bars">' +
    leaders.map(row => '<li><span><b>' + row.rank + '</b> ' + escapeText(row.name) +
      '</span><span class="track" aria-hidden="true"><i style="--width:' + (100 * row.gap / scale) +
      '%"></i></span><strong>' + (row.gap ? gapLabel(row) : '0:00,0') + '</strong></li>').join("") +
    '</ol></section></div>';
  byId("columns").innerHTML = '<tr><th scope="col">№</th><th scope="col">Биатлонист</th><th scope="col">Страна</th><th scope="col">Время</th><th scope="col">Отставание</th><th scope="col">Промахи</th></tr>';
  renderTable();
}
search.addEventListener("input", renderTable);
window.addEventListener("hashchange", renderRace);
renderRace();