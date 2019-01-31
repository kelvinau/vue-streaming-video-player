class Video {
  constructor({id, link, parts, content, shown}) {
    this.id = id;
    this.link = link;
    this.parts = parts;
    this.content = content;
    this.shown = shown;
  }
  showClip(clipStart, clipEnd) {

  }
}

class Part {
  constructor({id, groupId, start, end, className, type = 'range'}) {
    this.id = id;
    this.group = groupId;
    this.start = start;
    this.end = end;
    this.className = className;
    this.type = type;
  }
}
export {
  Video,
  Part,
};
