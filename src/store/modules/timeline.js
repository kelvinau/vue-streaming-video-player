import {Video, Part} from '../../factories/Video';

import {Timeline, DataSet} from 'vue2vis';

import moment from 'moment';

// separate to two state because looping videos to get back parts every time seems seems too much
const state = {
  videos: [],
  parts: [],
  refreshTimePeriod: 30,
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
  },
  setRefreshTimePeriod(state, value) {
    state.refreshTimePeriod = value;
  }
};

const actions = {
  // should be an async request
  // addNew is just a flag
  retrieveAllVideos({commit}, addNew) {

    return new Promise((resolve, reject) => {
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
            const first = moment().add(groupId, 'day');
            return Array.from({length: 1}, (p, j) => {
              const part = new Part({
                id: `${groupId}--${j}`,
                groupId,
                start: first.toDate(),
                end: first.add(30, 'days').toDate(),
              });

              allParts.push(part);
              return part;
            })
          })(i),
        })
      });

      // this is just for mock data
      if (addNew) {
        const current = moment();
        const part = new Part({
          id: '0--10',
          groupId: 0,
          content: 'New Fetched Item',
          start: current.add(31, 'days').toDate(),
          end: current.add(1, 'days').toDate(),
        })
        videos[videos.length - 1].parts.push(part);
        allParts.push(part);
      }
      commit('setVideos', videos);
      commit('setParts', allParts);

      resolve();
    });
  },
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
