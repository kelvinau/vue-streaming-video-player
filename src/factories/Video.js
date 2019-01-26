class Video {
  constructor({id, link, parts}) {
    this.id = id;
    this.link = link;
    this.parts = parts;
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
