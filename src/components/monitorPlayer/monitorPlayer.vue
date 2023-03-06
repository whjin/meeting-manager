<template>
  <div @dblclick="handleDBLclick">
    <video-player
      class="videoPlayer vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
    >
    </video-player>
  </div>
</template>

<script>
import videojs from 'video.js';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import 'videojs-flash';
import SWF_URL from 'videojs-swf/dist/video-js.swf';

videojs.options.flash.swf = SWF_URL;

export default {
  components: { videoPlayer },
  data () {
    return {
      playerOptions: {
        autoplay: false,
        muted: true,
        // loop: false,
        // preload: 'auto',
        // language: 'zh-CN',
        aspectRatio: '16:9',
        // fluid: true,
        sources: [
          {
            type: 'rtmp/mp4',
            src: ''
          }
        ],
        flash: {
          hls: {
            withCredentials: false
          },
          swf: SWF_URL
        },
        html5: {
          hls: {
            withCredentials: false
          }
        },
        techOrder: ['flash', 'html5'],
        controls: false
      }
    };
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    switchSources (src) {
      this.$nextTick(() => {
        this.playerOptions.sources[0].src = src;
      });
    },
    playerPlay () {
      this.$nextTick(() => {
        const myPlayer = this.$refs.videoPlayer.player;
        myPlayer.play();
      });
    },
    playerPause () {
      const myPlayer = this.$refs.videoPlayer.player;
      myPlayer.pause();
    },
    handleDBLclick () {
      const myPlayer = this.$refs.videoPlayer.player;
      if (myPlayer.isFullscreen()) {
        myPlayer.exitFullscreen();
      } else {
        myPlayer.requestFullscreen();
      }
    }
  },
  mounted () {
    // this.onPlayerPlay(this.$refs.videoPlayer.player);
  }
};
</script>

<style lang="less" scoped>
 .videoPlayer {
     height: calc(100% - 11px);
     pointer-events: none;
 }
 .video-js {
     height: 100%;
 }
</style>
