import Video from '../../factories/Video';

import {Timeline, DataSet} from 'vue2vis';

import moment from 'moment';

const state = {
  videos: new DataSet([]),
}

const getters = {
  parts(state) {
    const parts = [];
    state.videos.forEach((v) => {
      parts.push(...v.parts);
    })
    return new DataSet(parts);
    // return new DataSet(state.videos.reduce((combined, v) => [...combined, v.parts], []));
  }
}

const mutations = {
  setVideos(state, videos) {
    state.videos = new DataSet(videos);
  }
}

const actions = {
  // should be an async request
  retrieveAllVideos({commit}) {
    // mock data
    const videos = [];
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
              start: `2018-01-0${i + 1} 01:10`,
              // start: moment(`2018-01-0${i} 01:1${i}`).toDate(),
              // start: new Date(),

              end: `2018-01-0${i + 1} 10:10`,
            });
          }
          return parts;
        })(i),
      });
    }
    console.log(videos);
    commit('setVideos', videos);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
