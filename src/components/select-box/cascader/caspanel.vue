<template>
    <span>
        <ul v-if="data && data.length" :class="[prefixCls + '-menu']">
            <Casitem
                v-for="(item,index) in data"
                :key="index"
                :prefix-cls="prefixCls"
                :data="item"
                :tmp-item="tmpItem"
                @click.native.stop="handleClickItem(item)"
                @mouseenter.native.stop="handleHoverItem(item)"></Casitem>
        </ul><Caspanel v-if="sublist && sublist.length" :prefix-cls="prefixCls" :data="sublist" :disabled="disabled" :trigger="trigger" :change-on-select="changeOnSelect"></Caspanel>
    </span>
</template>
<script>
import Casitem from './casitem.vue';
import Emitter from 'iview/src/mixins/emitter';
import { findComponentUpward, findComponentDownward } from 'iview/src/utils/assist';

export default {
  name: 'Caspanel',
  mixins: [ Emitter ],
  components: { Casitem },
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    disabled: Boolean,
    changeOnSelect: Boolean,
    trigger: String,
    prefixCls: String
  },
  data () {
    return {
      tmpItem: {},
      result: [],
      sublist: []
    };
  },
  watch: {
    data () {
      this.sublist = [];
    }
  },
  methods: {
    handleClickItem (item) {
      if (this.trigger !== 'click' && item.children && item.children.length) return; // #1922
      this.handleTriggerItem(item, false, true);
    },
    handleHoverItem (item) {
      if (this.trigger !== 'hover' || !item.children || !item.children.length) return; // #1922
      this.handleTriggerItem(item, false, true);
    },
    handleTriggerItem (item, fromInit = false, fromUser = false, oldVal) {
      if (oldVal) {
        if (item.disabled) {
          return;
        }
        const cascader = findComponentUpward(this, 'Cascader');
        if (oldVal.loading !== undefined && !oldVal.children.length) {
          if (cascader && cascader.loadData) {
            cascader.loadData(oldVal, () => {
              // todo
              if (fromUser) {
                cascader.isLoadedChildren = true;
              }
              if (oldVal.children.length) {
                this.handleTriggerItem(oldVal, false, false, item);
              }
            }, item);
            return;
          }
        }
        // return value back recursion  // ????????????????????????????????????????????????????????????
        const backItem = this.getBaseItem(oldVal);
        // #5021 for this.changeOnSelect?????? if ????????? #4472
        if (
          this.changeOnSelect ||
          (backItem.label !== this.tmpItem.label || backItem.value !== this.tmpItem.value) ||
          (backItem.label === this.tmpItem.label && backItem.value === this.tmpItem.value)
        ) {
          this.tmpItem = backItem;
          this.emitUpdate([backItem]);
        }
        if (item.children && item.children.length) {
          this.sublist = item.children;
          this.dispatch('Cascader', 'on-result-change', {
            lastValue: true,
            changeOnSelect: this.changeOnSelect,
            fromInit: fromInit,
            searchLastValue: true
          });

          // #1553
          if (this.changeOnSelect) {
            const Caspanel = findComponentDownward(this, 'Caspanel');
            if (Caspanel) {
              Caspanel.$emit('on-clear', true);
            }
          }
        } else {
          this.sublist = [];
          this.dispatch('Cascader', 'on-result-change', {
            lastValue: true,
            changeOnSelect: this.changeOnSelect,
            fromInit: fromInit
          });
        }

        if (cascader) {
          cascader.$refs.drop.update();
        }
      } else {
        if (item.disabled) {
          return;
        }
        const cascader = findComponentUpward(this, 'Cascader');
        if (item.loading !== undefined && !item.children.length) {
          if (cascader && cascader.loadData) {
            cascader.loadData(item, () => {
              // todo
              if (fromUser) {
                cascader.isLoadedChildren = true;
              }
              if (item.children.length) {
                this.handleTriggerItem(item);
              }
            });
            return;
          }
        }
        // return value back recursion  // ????????????????????????????????????????????????????????????
        const backItem = this.getBaseItem(item);
        // #5021 for this.changeOnSelect?????? if ????????? #4472
        if (
          this.changeOnSelect ||
          (backItem.label !== this.tmpItem.label || backItem.value !== this.tmpItem.value) ||
          (backItem.label === this.tmpItem.label && backItem.value === this.tmpItem.value)
        ) {
          this.tmpItem = backItem;
          this.emitUpdate([backItem]);
        }
        if (item.children && item.children.length) {
          this.sublist = item.children;
          this.dispatch('Cascader', 'on-result-change', {
            lastValue: false,
            changeOnSelect: this.changeOnSelect,
            fromInit: fromInit
          });

          // #1553
          if (this.changeOnSelect) {
            const Caspanel = findComponentDownward(this, 'Caspanel');
            if (Caspanel) {
              Caspanel.$emit('on-clear', true);
            }
          }
        } else {
          this.sublist = [];
          this.dispatch('Cascader', 'on-result-change', {
            lastValue: true,
            changeOnSelect: this.changeOnSelect,
            fromInit: fromInit
          });
        }

        if (cascader) {
          cascader.$refs.drop.update();
        }
      }
    },
    updateResult (item) {
      this.result = [this.tmpItem].concat(item);
      this.emitUpdate(this.result);
    },
    getBaseItem (item) {
      let backItem = Object.assign({}, item);
      if (backItem.children) {
        delete backItem.children;
      }

      return backItem;
    },
    emitUpdate (result) {
      if (this.$parent.$options.name === 'Caspanel') {
        this.$parent.updateResult(result);
      } else {
        this.$parent.$parent.updateResult(result);
      }
    }
  },
  mounted () {
    this.$on('on-find-selected', (params) => {
      if (params.value.length !== 0) {
        const val = params.value;
        let value = [...val];
        const i = params.item;
        let item = { ...i };
        if (params.oldVal) {
          if (JSON.stringify(params.oldVal).length !== 2) {
            this.handleTriggerItem(item, false, false, params.oldVal);
          } else {
            this.handleTriggerItem(item);
          }
        } else {
          this.handleTriggerItem(item);
        }
        value.splice(0, 1);
        this.$nextTick(() => {
          this.broadcast('Caspanel', 'on-find-selected', {
            value: value,
            item: item
          });
        });
      }
    });
    // deep for #1553
    this.$on('on-clear', (deep = false) => {
      this.sublist = [];
      this.tmpItem = {};
      if (deep) {
        const Caspanel = findComponentDownward(this, 'Caspanel');
        if (Caspanel) {
          Caspanel.$emit('on-clear', true);
        }
      }
    });
  }
};
</script>
