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
  constructor({id, groupId, start, end}) {
    this.id = id;
    this.group = groupId;
    this.start = start;
    this.end = end;
  }
}
export {
  Video,
  Part,
};
