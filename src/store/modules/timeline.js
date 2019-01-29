import {Video, Part} from '../../factories/Video';

import {Timeline, DataSet} from 'vue2vis';

import moment from 'moment';

// separate to two state because looping videos to get back parts every time seems seems too much
const state = {
  videos: [],
  parts: [],
};

const getters = {
  firstStart(state) {
    // const item = state.parts.min('start');
    // return item ? item.start : '';
  },
  shownVideos(state) {
    return state.videos.filter((v) => v.shown);
  },
  shownParts(state) {
    // This is wrong - if a camera is removed
    return state.parts.filter((p) => state.videos[p.group].shown);
  },
};

const mutations = {
  setVideos(state, videos) {
    // TODO: should be working on the same instance instead?
    // state.videos = new DataSet(videos);
    state.videos = videos;
  },
  setParts(state, parts) {
    // state.parts = new DataSet(parts);
    state.parts = parts;
  },
  addParts(state, part) {
    // TODO: Also handle videos
    state.parts.push(part);
  },
  toggleShown(state, groupId) {
    // TODO: O(nlogn) every time? maybe use an object structure
    const video = state.videos.find((v) => groupId === v.id);
    video.shown = !video.shown;
  }
};

const actions = {
  // should be an async request
  retrieveAllVideos({commit}) {



    // mock data
    const allParts = [];

    const videos = Array.from({length: 4}, (v, i) => {
      return new Video({
        id: i,
        link: `https://portal.hdontap.com/s/embed/?stream=streamname`,
        content: `Video ${i}`,
        shown: true,

        // Is it worth it to use this data structure? useful?
        parts: ((groupId) => {
          return Array.from({length: 10}, (p, j) => {
            const part = new Part({
              id: `${groupId}--${j}`,
              groupId,
              start: `2019-01-0${j + 1} ${groupId}:${j}`,
              // start: moment(`2018-01-0${i} 01:1${i}`).toDate(),
              // start: new Date(),

              end: `2019-01-0${j + 1} ${groupId + 10}:${j}`,
            });

            allParts.push(part);
            return part;
          })
        })(i),
      })
    });

    commit('setVideos', videos);
    commit('setParts', allParts);
  }
};

function getParts(videos) {
    const parts = [];
    state.videos.forEach((v) => {
      parts.push(...v.parts);
    });
    return parts;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
