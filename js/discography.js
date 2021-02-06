const songData = [
	{
		title: "x",
		length: "y",
		releaseDate: "z",
		type: "original",
		streams: [
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			}
		]
	},
	{
		title: "x",
		length: "y",
		releaseDate: "a",
		type: "original",
		streams: [
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			}
		]
	},
	{
		title: "x",
		length: "y",
		releaseDate: "z",
		type: "remix",
		streams: [
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			}
		]
	},
	{
		title: "x",
		length: "y",
		releaseDate: "a",
		type: "remix",
		streams: [
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			},
			{
				name: "youtube",
				url: "https://www.youtube.com/watch?v=V3M2rCmgK0o"
			}
		]
	}
];
let discographyTable;

function createStreamLink(service, streamingOnElement) {
	let link = document.createElement("a"),
		icon = document.createElement("i")
	streamingOnElement
		.appendChild(link);
	link
		.appendChild(icon);
	link.setAttribute("href", service.url);
	icon.className = `Icon fab fa-wrapper fa-${service.name}`;
	return link;
}

function childrenToArray(e) {
	let a = [];
	for (const child of e.children) {
		a.push(child);
	};
	return a;
}
function sortTables(n) {
	let rows,
		i,
		x,
		y,
		tables = document.getElementsByClassName("sS"),
		dir = "low-high",
		_debounce = true,
		deC = 0,
		debounce = true;
	while (debounce) {
		debounce = false;
		for (table of tables) {
			rows = table.rows;
			for (i = 1; i < (rows.length - 1); i++) {
				_debounce = false;
				x = rows[i].getElementsByTagName("th")[n];
				y = rows[i + 1].getElementsByTagName("th")[n];
				if (dir == "low-high") {
					if (n = 2) {
						new Date(x.innerHTML.toLowerCase()) > new Date(y.innerHTML.toLowerCase())
					} if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						_debounce = true;
						break;
					}
				} else if (dir == "high-low") {
					if (n = 2) {
						new Date(x.innerHTML.toLowerCase()) < new Date(y.innerHTML.toLowerCase())
					} else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						_debounce = true;
						break;
					}
				}
			}
			if (_debounce) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				debounce = true;
				deC++;
			} else {
				if (deC == 0 && dir == "low-high") {
					dir = "high-low";
					debounce = true;
				}
			}
		}
	}
}
window.addEventListener(
	"load", 
	() => {
		discographyTable = document.getElementById("discography");
		document
					.getElementsByClassName("remixS")[0]
				.style
				.margin = songData
					.filter(
						song =>
						song.type !== "original"
					).length > 0 ?
				"0 0" : 
				"-39.05px 0";
		function fixRemixTableMargin() {
			let remixTable = 
				document
					.getElementsByClassName("remixS")[0]
			remixTable
				.style
				.margin = `${
					(
						songData
							.filter(
								song =>
								song.type === "original"
							).length * 39.05
					) + (
						songData
							.filter(
								song =>
								song.type === "original"
							).length - 1
					) - 90.1
				}px 0`;
		}
		for (const song of songData) {
			let songElement = document.createElement("tr"),
				lengthElement = document.createElement("th"),
				titleElement = document.createElement("th"),
				releaseDateElement = document.createElement("th"),
				streamingOnElement = document.createElement("th");
			discographyTable
				.children[
					song.type === "original" ?
					1 :
					2
				]
				.children[3].children[0].children[1]
				.appendChild(songElement);
				fixRemixTableMargin()
			songElement
				.appendChild(lengthElement);
			songElement
				.appendChild(titleElement);;
			songElement
				.appendChild(releaseDateElement);;
			songElement
				.appendChild(streamingOnElement);
			for (const service of song.streams) {
				createStreamLink(service, streamingOnElement)
			};
			streamingOnElement
				.style.display = "flex";
			streamingOnElement
				.style["justify-content"] = "center";
			lengthElement
				.setAttribute("scope", "row")
			lengthElement
				.innerHTML = song.length;
			titleElement
				.innerHTML = song.title;
			releaseDateElement
				.innerHTML = song.releaseDate;
		}
	}
);
