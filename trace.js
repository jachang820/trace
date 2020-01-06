let trace = {};
trace.class = {
	"source": "trace-element",
	"on": "trace-on",
	"marked": "trace-marked",
	"switchOff": "trace-switch-off",
	"switchOn": "trace-switch-on",
	"switchLabel": "trace-label",
	"switchLabelOn": "trace-label-on",
	"exclude": "trace-exclude"
};
trace.ids = {
	"switch": "trace-switch"
}
trace.element = document.getElementsByClassName(trace.class.source)[0];
trace.defaults = window.getComputedStyle(trace.element);
trace.assets = {};
trace.SVGNS = "http://www.w3.org/2000/svg";
trace.state = "off";

trace.assets.outerGlowFilter = (function() {
	let filter = document.createElementNS(trace.SVGNS, "filter");
	filter.id = "outer-glow";
	filter.height = "200%";
	filter.width = "200%";

	let morph = document.createElementNS(trace.SVGNS, "feMorphology");
	morph.setAttribute("operator", "dilate");
	morph.setAttribute("radius", "1");
	morph.setAttribute("in", "SourceAlpha");
	morph.setAttribute("result", "thicken");
	filter.appendChild(morph);

	let gaussian = document.createElementNS(trace.SVGNS, "feGaussianBlur");
	gaussian.setAttribute("in", "thicken");
	gaussian.setAttribute("stdDeviation", "2");
	gaussian.setAttribute("result", "blurred");
	filter.appendChild(gaussian);

	let flood = document.createElementNS(trace.SVGNS, "feFlood");
	flood.setAttribute("flood-color", "rgb(255,204,0)");
	flood.setAttribute("result", "glowColor");
	filter.appendChild(flood);

	let composite = document.createElementNS(trace.SVGNS, "feComposite");
	composite.setAttribute("in", "glowColor");
	composite.setAttribute("in2", "blurred");
	composite.setAttribute("operator", "in");
	composite.setAttribute("result", "coloredGlow");
	filter.appendChild(composite);

	let merge = document.createElementNS(trace.SVGNS, "feMerge");
	let mergeNode = document.createElementNS(trace.SVGNS, "feMergeNode");
	mergeNode.setAttribute("in", "coloredGlow");
	merge.appendChild(mergeNode);

	mergeNode = document.createElementNS(trace.SVGNS, "feMergeNode");
	mergeNode.setAttribute("in", "SourceGraphic");
	merge.appendChild(mergeNode);
	filter.appendChild(merge);
	return filter;
})();

trace.assets.switchLabel = (function() {
	let svg = document.createElementNS(trace.SVGNS, "svg");
	svg.setAttribute("viewBox", "0 0 408 137");
	svg.setAttribute("fill-rule", "evenodd");
	svg.id = trace.class.switchLabel;
	let group = document.createElementNS(trace.SVGNS, "g");
	
	let path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d", 
		"M 15.2 0L 15.2 28.8L 0.8 28.8L 0.8 43.2L 15.2 43.2L 15.2 104C 15.2147 113.166 17.8348 126.21 25.6834 132.067C 34.3171 138.51 48.2862 136 58.4 136L 58.4 121.6C 51.382 121.595 43.5151 120.876 39.3179 114.368C 35.3398 108.199 36.8 98.9736 36.8 92L 36.8 43.2L 53.6 43.2L 53.6 28.8L 36.8 28.8L 36.8 0L 15.2 0z");
	group.appendChild(path);
	
	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 68 30.4L 68 136L 90.4 136C 90.4 100.909 92.4824 65.107 88 30.4L 68 30.4z");
	group.appendChild(path);
	
	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 99.2 52.8C 109.012 50.8972 117.312 50.7503 127.2 52L 127.2 29.6C 120.338 29.6 104.358 28.7925 100.022 35.5148C 97.5 39.4252 99.2 48.2521 99.2 52.8z");
	group.appendChild(path);
	
	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 162.4 136L 162.4 121.6C 148.382 120.155 145.324 101.984 152.631 92.012C 158.376 84.1736 168.036 84 176.8 84L 176.8 71.2C 162.226 71.2 145.731 72.6856 135.735 84.8312C 125.433 97.3496 125.815 119.55 139.203 129.977C 145.959 135.238 154.182 136 162.4 136z");
	group.appendChild(path);

	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 144 52C 153.85 46.5382 170.121 37.8478 180.714 46.8266C 185.31 50.7226 185.591 57.6145 185.6 63.2C 185.623 77.6074 188.843 96.4536 185.346 110.4C 183.566 117.498 175.604 117.319 172.022 122.159C 169.998 124.895 171.2 131.137 171.2 134.4C 178.521 132.702 186.31 128.656 189.6 121.6L 192 121.6C 194.959 131.585 208.669 141.235 212.401 126.4C 213.594 121.656 208.152 112.913 208.012 107.2C 207.524 87.3016 212.955 58.1064 200.876 40.8031C 190.706 26.2346 168.711 27.2112 153.6 31.542C 149.383 32.7506 139.306 35.1751 137.958 40.0747C 137.01 43.5192 142.19 49.2634 144 52z");
	group.appendChild(path);

	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 264 136L 264 118.4C 240.886 112.907 238.341 76.5217 248.372 59.2C 250.53 55.473 253.178 52.0811 256.801 49.6864C 258.813 48.356 262.396 47.5649 263.518 45.2654C 265.438 41.3264 264 33.9407 264 29.6C 205.475 30.8079 205.818 133.495 264 136M 272.8 29.6L 272.8 46.4C 280.567 46.7386 287.115 50.0143 292.8 55.2C 295.716 53.1024 301.914 48.0838 301.459 44.0031C 300.378 34.2922 280.41 29.663 272.8 29.6z");
	group.appendChild(path);

	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 272.8 118.4L 272.8 136C 282.005 135.604 291.306 131.806 297.481 124.769C 300.728 121.068 297.986 112.019 292.653 111.125C 290.03 110.685 286.97 113.665 284.8 114.806C 281.041 116.782 276.93 117.598 272.8 118.4z");
	group.appendChild(path);

	path = document.createElementNS(trace.SVGNS, "path");
	path.setAttribute("d",
		"M 381.6 109.6L 380.8 109.6C 365.751 122.394 341.184 122.126 330.475 104C 325.245 95.1456 324.908 82.6176 326.933 72.8C 328.57 64.8622 331.857 57.126 337.829 51.4605C 340.466 48.9586 346.783 47.5974 348.318 44.4648C 350.242 40.5352 348.8 33.1338 348.8 28.8C 332.515 29.51 318.798 42.0192 311.807 56C 298.098 83.42 308.422 121.738 338.4 133.258C 350.69 137.98 367.018 137.373 378.4 130.458C 381.574 128.53 388.342 124.332 387.984 120C 387.69 116.44 383.694 112.324 381.6 109.6M 358.4 28.8L 358.4 45.6C 372.293 47.6824 380.764 61.2014 380.8 74.4L 336.8 74.4L 336.8 89.6L 401.6 89.6C 401.6 62.1826 390.362 31.4107 358.4 28.8z");
	group.appendChild(path);
	svg.appendChild(group);

	let def = document.createElementNS(trace.SVGNS, "def");
	def.appendChild(trace.assets.outerGlowFilter);
	svg.appendChild(def);

	return svg;
})();

trace.assets.switchButton = (function() {
	let button = document.createElement("button");
	button.id = trace.class.switchOff;
	button.type = "button";
	button.appendChild(trace.assets.switchLabel);
	return button;
})();

trace.assets.switchBox = (function() {
	let div = document.createElement("div");
	div.id = trace.ids.switch;
	div.classList.add(trace.class.exclude);
	div.appendChild(trace.assets.switchButton);
	let p = document.createElement("p");
	let explanation = document.createTextNode("A new way to interact.");
	p.appendChild(explanation);
	p.classList.add(trace.class.exclude);
	div.appendChild(p);
	return div;
})();

trace.element.appendChild(trace.assets.switchBox);

document.head.appendChild((function() {
	let styles = document.createElement("style");
	styles.type = "text/css";
	let fontSize = parseInt(trace.defaults.fontSize);
	let padRight = parseInt(trace.defaults.paddingRight);
	let padLeft = parseInt(trace.defaults.paddingLeft);
	let padTop = parseInt(trace.defaults.paddingTop);
	let padBottom = parseInt(trace.defaults.paddingBottom);
	if (trace.element.offsetWidth > document.body.offsetWidth * 0.90) {
		padRight += 100;
		padLeft += 15;
	}
	if (padTop < 50) {
		padTop = 50;
	}
	if (padBottom < 20) {
		padBottom = 20;
	}
	let isStatic = (trace.defaults.position == "static");
	styles.appendChild(document.createTextNode(`
		.${trace.class.source} {
			position: ${isStatic ? "relative" : trace.defaults.position };
			left: ${isStatic ? "0px" : trace.defaults.left };
			top: ${isStatic ? "0px" : trace.defaults.top };
			padding-top: ${padTop}px;
		}

		@keyframes text-vertical {
			from {line-height: ${fontSize}px; }
			to {line-height: ${fontSize + 30}px; }
		}

		@keyframes pad-sides {
			0% {
				padding-left: ${trace.defaults.paddingLeft};
				padding-right: ${trace.defaults.paddingRight};
			}
			90% {
				padding-left: ${trace.defaults.paddingLeft};
				padding-right: ${trace.defaults.paddingRight};
			}
			100% {
				padding-left: ${padLeft}px;
				padding-right: ${padRight}px;
			}
		}

		.${trace.class.on} {
			line-height: ${fontSize + 30}px;
			padding-bottom: ${padBottom}px;
			padding-left: ${padLeft}px;
			padding-right: ${padRight}px;
			animation: text-vertical 2s, pad-sides 2.2s;
		}

		#${trace.ids.switch} {
			line-height: ${parseInt(trace.defaults.fontSize)}px;
			position: absolute;
			top: 0px;
			left: 0px;
		}

		#${trace.ids.switch} p {
			margin: -3px;
			font-size: 10pt;
		}

		#${trace.class.switchLabel} {
			height: 25px;
			fill: #838383;
		}

		#${trace.class.switchLabel}:hover {
			filter: url(#outer-glow);
		}

		#${trace.class.switchLabelOn} {
			height: 25px;
			fill: #838383;
			filter: url(#outer-flow);
		}

		#${trace.class.switchOff} {
			padding: 2px;
			margin: 0px;
			border: 1px solid black;
		}

		#${trace.class.switchOn} {
			padding: 2px;
			margin: 0px;
			border: 1px solid black;
		}

		.${trace.class.marked} {
			background-image: url("data:image/png;base64,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");
			background-size: contain;
			filter: hue-rotate(90deg);
			padding-top: 5px;
			padding-bottom: 3px;
		}
	`));
	return styles;
})());

reactsStub = {
	'reacts': [
		{ 
			'id': 5367, 
			'username': 'jaxstax97', 
			'react': 'What is this nonsense?',
			'selected': '0-17, 40-50'
		},
		{ 
			'id': 4432, 
			'username': 'gregdabest', 
			'react': 'Latin sucks!!!',
			'selected': '0-11'
		},
		{
			'id': 1257, 
			'username': 'zee9001', 
			'react': 'I am a troll teehee.',
			'selected': '57-123'
		}
	]
};

trace.isTextNode = function(node) {
	return node.nodeType == Node.TEXT_NODE;
};

trace.isMarked = function(node) {
	if (trace.isTextNode(node)) {
		node = node.parentElement;
	}
	return node.classList.contains(trace.class.marked);
};

trace.isExcluded = function(node) {
	if (trace.isTextNode(node)) {
		node = node.parentElement;
	}
	return node.classList.contains(trace.class.exclude);
};

trace.textExists = function(text) {
	return text && /\S/.test(text);
};

trace.validParent = function(node) {
	return !trace.isTextNode(node) && !trace.isExcluded(node);
};

trace._findChildTextNode = function(node, reversed) {
	const child = reversed ? "lastChild" : "firstChild";
	let text = node.textContent;
	while (trace.validParent(node) && trace.textExists(text)) {
		node = node[child];
		text = node.textContent;
	}
	return node;
};

trace.findFirstChildTextNode = function(node) {
	return trace._findChildTextNode(node, false);
};

trace.findLastChildTextNode = function(node) {
	return trace._findChildTextNode(node, true);
};

trace._findAdjacentTextNode = function(node, reversed) {
	const sibling = reversed ? "previousSibling" : "nextSibling";
	let findChildTextNode;
	if (reversed) {
		findChildTextNode = trace.findLastChildTextNode;
	} else {
		const sibling = "nextSibling";
		findChildTextNode = trace.findFirstChildTextNode;
	}

	let moved = false;
	while (!(trace.isTextNode(node) && moved)) {
		moved = true;
		if (node[sibling]) {
			node = findChildTextNode(node[sibling]);
		} else if (node === trace.element) {
			return null;
		} else {
			node = node.parentNode;
		}
	}
	return node;
};

trace.findNextTextNode = function(node) {
	return trace._findAdjacentTextNode(node, false);
};

trace.findPreviousTextNode = function(node) {
	return trace._findAdjacentTextNode(node, true);
};

trace._findVisibleChar = function(node, position, reversed) {
	let text = node.textContent;
	let substr = reversed ? 
		text.substring(0, position + 1).trim() : 
		text.substring(position).trim();
	let iterate = reversed ? 
		function(p) { return p - 1} :
		function(p) { return p + 1};

	if (text && substr) {
		while (/^\s$/.test(text[position])) {
			position = iterate(position);
		}
		return position;
	
	} else {
		return -1;
	}
};

trace.findNextVisibleChar = function(node, position) {
	return trace._findVisibleChar(node, position, false);
};

trace.findPreviousVisibleChar = function(node, position) {
	return trace._findVisibleChar(node, position, true);
};

trace.createRangeOnNode = function(node) {
	if (node) {
		let range = document.createRange();
		range.selectNode(node);
		return range;
	} else {
		return null;
	}
};

trace.validRangeBoundaries = function(start, end) {
	if (!start || !end) {
		return null;
	}
	if (start instanceof Node) {
		start = trace.createRangeOnNode(start);
	}
	if (end instanceof Node) {
		end = trace.createRangeOnNode(end);
	}
	return start.compareBoundaryPoints(Range.END_TO_START, end) < 1;
};

trace._trimWSFromOneSideOfRange = function(range, atEnd) {
	let node = atEnd ? range.endContainer : range.startContainer;
	let findVisibleChar, findTextNode, adjustOffset, testValidRange;
	let setBound, offset, newPosition;
	if (atEnd) {
		findVisibleChar = function(node, position) {
			return trace.findPreviousVisibleChar(node, position - 1);
		};
		findTextNode = function(node) {
			return trace.findPreviousTextNode(node);
		};
		adjustOffset = function(position) { 
			return position + 1; 
		};
		testValidRange = function(newNode, reference) {
			return trace.validRangeBoundaries(reference, newNode);
		};
		newPosition = function(newNode) {
			return newNode.nodeValue.length;
		};
		setBound = "setEnd";
		offset = "endOffset";
	} else {
		findVisibleChar = function(node, position) {
			return trace.findNextVisibleChar(node, position);
		};
		findTextNode = function(node) {
			return trace.findNextTextNode(node);
		};
		adjustOffset = function(position) { 
			return position; 
		};
		testValidRange = function(newNode, reference) {
			return trace.validRangeBoundaries(newNode, reference);
		};
		newPosition = function(newNode) {
			return 0;
		}
		setBound = "setStart";
		offset = "startOffset";
	}

	let text = node.textContent;
	let position = findVisibleChar(node, range[offset]);
	if (position >= 0) {
		range[setBound](node, adjustOffset(position));
	} else {
		node = findTextNode(node);
		if (trace.validRangeBoundaries(node, range)) {
			position = findVisibleChar(node, newPosition(node));
			range[setBound](node, adjustOffset(position));
		} else {
			range.collapse();
			return false;
		}
	}
	return true;
};

trace.trimWSFromLeftOfRange = function(range) {
	return trace._trimWSFromOneSideOfRange(range, false);
};

trace.trimWSFromRightOfRange = function(range) {
	return trace._trimWSFromOneSideOfRange(range, true);
}

trace.trimWSFromRange = function(range) {
	return trace.trimWSFromLeftOfRange(range) &&
		trace.trimWSFromRightOfRange(range);
};

trace._alignRangeWithTextNode = function(range, node, isEnd) {
	const offset = isEnd ? node.textContent.length : 0;
	const setBound = isEnd ? "setEnd" : "setStart";

	if (trace.isTextNode(node)) {
		range[setBound](node, offset);
		return true;
	} else {
		range.collapse();
		return false;
	}
};

trace.endRangeAtEndOfTextNode = function(range, node) {
	return trace._alignRangeWithTextNode(range, node, true);
};

trace.startRangeAtStartOfTextNode = function(range, node) {
	return trace._alignRangeWithTextNode(range, node, false);
};

trace.removeExcludedFromRange = function(range) {
	let endNode = range.endContainer;
	if (trace.isExcluded(endNode)) {
		let parent = endNode.parentNode;
		while (trace.isExcluded(parent)) {
			endNode = parent;
			parent = endNode.parentNode;
		}
		endNode = trace.findPreviousTextNode(endNode);
		range.setEnd(endNode, endNode.textContent.length);
	}
};

trace.spliceMarkedNodes = function(range) {
	let startNode = range.startContainer;
	let endNode = range.endContainer;
	if (trace.isMarked(endNode)) {
		endNode = trace.findPreviousTextNode(endNode.parentNode);
	} else if (range.endOffset < endNode.textContent.length) {
		endNode = endNode.splitText(range.endOffset).previousSibling;
	}

	if (!trace.endRangeAtEndOfTextNode(range, endNode)) {
		return;
	}

	if (range.startOffset > 0 && !trace.isMarked(startNode)) {
		startNode = startNode.splitText(range.startOffset);
		trace.startRangeAtStartOfTextNode(range, startNode);
	}
};

trace.markedNodesIterator = function(range) {
	let startReached, endReached;
	return document.createNodeIterator(
		range.commonAncestorContainer,
		NodeFilter.SHOW_TEXT,
		function(node) {
			if (node === range.startContainer) startReached = true;
			let outOfBounds = !startReached || endReached;
			if (node === range.endContainer) endReached = true;

			let markedText = trace.isMarked(node);
			let excluded = trace.isExcluded(node);
			if (outOfBounds || markedText || excluded) {
				return NodeFilter.FILTER_REJECT;
			} else {
				return NodeFilter.FILTER_ACCEPT;
			}
		}
	);
};

trace._markIsAdjacent = function(node, precedes) {
	const sibling = precedes ? "previousSibling" : "nextSibling";
	return (node[sibling] && trace.isMarked(node[sibling]));
};

trace.markPrecedes = function(node) {
	return trace._markIsAdjacent(node, true);
};

trace.markFollows = function(node) {
	return trace._markIsAdjacent(node, false);
};

trace.markNode = function(node) {
	let mark = document.createElement("mark");
	mark.classList.add(trace.class.marked);
	mark.appendChild(node.cloneNode());
	node.parentNode.insertBefore(mark, node);
	node.parentNode.removeChild(node);
	return mark;
};

trace._combineAdjacentMark = function(adjMark, previous) {
	const sibling = previous ? "previousSibling" : "nextSibling";
	let insertFunction;
	if (previous) { 
		insertFunction = function(adjMark, newNode) {
			adjMark.insertBefore(newNode, adjMark.firstChild);
		};
	} else {
		insertFunction = function(adjMark, newNode) {
			adjMark.append(newNode);
		};
	}

	let newNode = adjMark[sibling].firstChild.cloneNode();
	insertFunction(adjMark, newNode);
	adjMark.parentNode.removeChild(adjMark[sibling]);
};

trace.combinePriorMark = function(followingMark) {
	trace._combineAdjacentMark(followingMark, true);
};

trace.combineFollowingMark = function(priorMark) {
	trace._combineAdjacentMark(priorMark, false);
};

trace.combineMarks = function(newMark) {
	if (trace.markPrecedes(newMark)) {
		trace.combinePriorMark(newMark);
	}
	if (trace.markFollows(newMark)) {
		trace.combineFollowingMark(newMark);
	}
	newMark.normalize();
}

trace.markSelections = function(sel) {
	let range = sel.getRangeAt(0);
	if (trace.trimWSFromRange(range)) {
		trace.removeExcludedFromRange(range);
		trace.spliceMarkedNodes(range);
		if (!range.collapsed) { 
			let it = trace.markedNodesIterator(range);

			while (it.nextNode()) {
				let mark = trace.markNode(it.referenceNode);
				trace.combineMarks(mark);
			}

			trace.element.normalize();
			sel.empty();
		}
	}
};

trace.unmarkSelections = function() {
	let marked = document.getElementsByClassName(trace.class.marked);
	while (marked.length > 0) {
		marked[0].insertAdjacentText('beforebegin', marked[0].textContent);
		marked[0].parentNode.removeChild(marked[0]);
	};
	trace.element.normalize();
};

trace.handleSelections = function() {
	let sel = window.getSelection();
	if (trace.element.contains(sel.anchorNode)) {
		if (sel.toString().trim()) {
			trace.markSelections(sel);
		} else {
			trace.unmarkSelections();
		}
	}
};

trace.getRangeLength = function(range) {
	return range.toString().length;
};

trace.getRangeOffset = function(range) {
	let clone = range.cloneRange();
	clone.setStart(trace.element, 0);
	clone.setEnd(range.startContainer, range.startOffset);
	return trace.getRangeLength(clone);
};

trace.on = function() {
	trace.assets.switchButton.classList.remove(trace.class.switchOff);
	trace.assets.switchButton.classList.add(trace.class.switchOn);
	trace.assets.switchLabel.classList.remove(trace.class.switchLabel);
	trace.assets.switchLabel.classList.add(trace.class.switchLabelOn);
	trace.element.classList.add(trace.class.on);
	trace.element.addEventListener("mouseup", trace.handleSelections);
	trace.state = "on";
};

trace.off = function() {
	trace.assets.switchButton.classList.remove(trace.class.switchOn);
	trace.assets.switchButton.classList.add(trace.class.switchOff);
	trace.assets.switchLabel.classList.remove(trace.class.switchLabelOn);
	trace.assets.switchLabel.classList.add(trace.class.switchLabel);
	trace.element.classList.remove(trace.class.on);
	trace.element.removeEventListener("mouseup", trace.handleSelections);
	trace.state = "off";
};

trace.toggle = function() {
	(trace.state === "off") ? trace.on() : trace.off();
};

trace.assets.switchButton.addEventListener("click", trace.toggle);
