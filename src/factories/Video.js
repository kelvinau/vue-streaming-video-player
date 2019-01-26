// DataSet normalize and gets the value out
// so the prototype will be lost
// unless using simple array for the input and calling redraw() on the timeline every time
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
  constructor(id, groupId, start, end) {
    this.id = id;
    this.groupId = groupId;
    this.start = start;
    this.end = end;
  }
}
export {
  Video,
  Part,
};
