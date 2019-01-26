import {Video, Part} from '../../factories/Video';

import {Timeline, DataSet} from 'vue2vis';

import moment from 'moment';

// separate to two state because looping videos to get back parts every time seems seems too much
const state = {
  videos: new DataSet([]),
  parts: new DataSet([]),
}

const getters = {
  firstStart(state) {
    return state.gett
  },
}

const mutations = {
  setVideos(state, videos) {
    // TODO: should be working on the same instance instead?
    state.videos = new DataSet(videos);
  },
  setParts(state, parts) {
    state.parts = new DataSet(parts);
  },
}

const actions = {
  // should be an async request
  retrieveAllVideos({commit}) {
    // mock data
    const videos = [];
    const allParts = [];
    for (let i = 0; i < 10; i++) {
      // videos.push(new Video({
        // id: i,
        // link: `/video.com?${i}`,
        // content: 'aaa',
        // start: `2018-04-0${i} 01:10`,
        // end: `2018-04-0${i} 01:10`,
      // }));
      videos.push({
        id: i,
        link: `/video.com?${i}`,
        content: `Video ${i}`,
        parts: (function(groupId) {
          const parts = [];
          for (let i = 0; i < 10; i++) {
            parts.push({
              id: `${groupId}--${i}`,
              group: groupId,
              start: `2018-01-0${i + 1} ${groupId}:${i}`,
              // start: moment(`2018-01-0${i} 01:1${i}`).toDate(),
              // start: new Date(),

              end: `2018-01-0${i + 1} ${groupId + 10}:${i}`,
            });
          }
          allParts.push(...parts);
          return parts;
        })(i),
      });
    }
    // console.log(videos);
    commit('setVideos', videos);
    commit('setParts', allParts);
  }
}

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
}
