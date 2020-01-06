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

trace.assets.switchButton = (function() {
	let button = document.createElement("button");
	button.classList.add(trace.class.switchOff);
	button.type = "button";
	button.textContent = "TRACE";
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
			70% {
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
			animation: text-vertical 2s, pad-sides 1.4s;
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

		.${trace.class.switchLabel} {
			height: 25px;
			fill: #838383;
		}

		.${trace.class.switchLabel}:hover {
			filter: url(#outer-glow);
		}

		.${trace.class.switchLabelOn} {
			height: 25px;
			fill: #838383;
			filter: url(#outer-flow);
		}

		.${trace.class.switchOff} {
			height: 30px;
			width: 75px;
			padding: 2px;
			margin: 0px;
			border: 1px solid black;
			border-radius: 15px;
			background-color: lightgrey;
			font-size: 20px;
			font-weight: 900;
		}

		.${trace.class.switchOn} {
			height: 30px;
			width: 75px;
			padding: 2px;
			margin: 0px;
			border: 1px solid black;
			border-radius: 15px;
			background-color: orange;
			font-size: 20px;
			font-weight: 900;
		}

		.${trace.class.marked} {
			background-image: url("hilite.png");
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

trace.validParent = function(node) {
	return !trace.isTextNode(node) && !trace.isExcluded(node);
};

trace._findChildTextNode = function(node, reversed) {
	const child = reversed ? "lastChild" : "firstChild";
	let text = node.textContent;
	while (trace.validParent(node) && text.trim()) {
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
		findChildTextNode = trace.findFirstChildTextNode;
	}

	let moved = false;
	while (!(trace.isTextNode(node) && node.textContent.trim() && moved)) {
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

trace.rangedNodesIterator = function(range) {
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
	node = precedes ? 
		trace.findPreviousTextNode(node) :
		trace.findNextTextNode(node);
	if (node && trace.isMarked(node)) {
		return node;
	} else {
		return null;
	}
};

trace.markPrecedes = function(node) {
	return trace._markIsAdjacent(node, true);
};

trace.markFollows = function(node) {
	return trace._markIsAdjacent(node, false);
};

trace.insertNewMarkBeforeNode = function(node) {
	let mark = document.createElement("mark");
	mark.classList.add(trace.class.marked);
	node.parentNode.insertBefore(mark, node);
	return mark;
};

trace.markRange = function(range) {
	let mark = trace.insertNewMarkBeforeNode(range.startContainer);
	let it = trace.rangedNodesIterator(range);
	while (it.nextNode()) {
		let node = it.referenceNode;
		mark.appendChild(node.cloneNode());
		node.parentNode.removeChild(node);
	}
	return mark;
};

trace.groupAdjacentMarks = function(node) {
	let first = trace.markPrecedes(node) || node;
	if (trace.isMarked(first)) {
		first = trace.unmarkNamedSelection(first.parentNode);
	}
	let second = trace.markFollows(node) || node;
	if (trace.isMarked(second)) {
		second = trace.unmarkNamedSelection(second.parentNode);
	}
	let range = document.createRange();
	range.setStart(first, 0);
	range.setEnd(second, second.nodeValue.length);
	return range
};

trace.markSelection = function(sel) {
	let range = sel.getRangeAt(0);
	if (trace.trimWSFromRange(range)) {
		trace.removeExcludedFromRange(range);
		trace.spliceMarkedNodes(range);
		if (!range.collapsed) { 
			let it = trace.rangedNodesIterator(range);

			while (it.nextNode()) {
				let adjRange = trace.groupAdjacentMarks(it.referenceNode);
				let mark = trace.markRange(adjRange);
			}

			sel.empty();
		}
	}
};

trace.unmarkSelection = function(mark) {
	mark.insertAdjacentText('beforebegin', mark.textContent);
	let textNode = mark.previousSibling;
	mark.parentNode.removeChild(mark);
	return textNode;
};

trace.unmarkNamedSelection = function(mark) {
	console.assert(trace.isMarked(mark.firstChild));
	return trace.unmarkSelection(mark);
};

trace.unmarkAllSelections = function() {
	let marked = document.getElementsByClassName(trace.class.marked);
	while (marked.length > 0) {
		trace.unmarkSelection(marked[0]);
	}
};

trace.handleSelections = function() {
	let sel = window.getSelection();
	if (trace.element.contains(sel.anchorNode)) {
		if (sel.toString().trim()) {
			trace.markSelection(sel);
		} else {
			trace.unmarkAllSelections();
		}
	}
	trace.element.normalize();
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
	trace.element.classList.add(trace.class.on);
	trace.element.addEventListener("mouseup", trace.handleSelections);
	trace.state = "on";
};

trace.off = function() {
	trace.assets.switchButton.classList.remove(trace.class.switchOn);
	trace.assets.switchButton.classList.add(trace.class.switchOff);
	trace.element.classList.remove(trace.class.on);
	trace.element.removeEventListener("mouseup", trace.handleSelections);
	trace.state = "off";
};

trace.toggle = function() {
	(trace.state === "off") ? trace.on() : trace.off();
};

trace.assets.switchButton.addEventListener("click", trace.toggle);
