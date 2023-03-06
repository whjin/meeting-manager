<template>
  <i-form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <i-form-item prop="accountName">
      <i-input v-model="form.accountName" placeholder="请输入用户名">
        <span slot="prepend">
          <i-icon :size="16" type="ios-person-outline"></i-icon>
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <i-icon :size="14" type="ios-unlock-outline"></i-icon>
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="identify" v-if="showIdentify">
      <div class="identify-item">
        <i-input type="text" class="identify-input" v-model="form.identify" placeholder="请输入验证码">
          <span slot="prepend">
            <i-icon :size="14" type="ios-unlock-outline"></i-icon>
          </span>
        </i-input>
        <s-identify :identifyCode="identifyCode" @refresh-code="refreshCode"></s-identify>
      </div>
    </i-form-item>
    <i-form-item>
      <Border>
        <i-button @click="handleSubmit" type="primary">登录</i-button>
      </Border>
    </i-form-item>
  </i-form>
</template>
<script>
import Border from '@/components/border/border.vue';
import SIdentify from '@/components/identify/identify.vue';
export default {
  name: 'LoginForm',
  components: {
    Border,
    SIdentify
  },
  props: {
    accountNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {
            required: true, validator: async (rule, value, callback) => {
              if (value === '') {
                return callback(new Error('密码不能为空'));
              } else {
                let reg = await /(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
                if (value.length < 6 || !reg.test(value)) {
                  return callback('密码要求包含英文和数字，且不少于6位');
                }
              }
            }, trigger: 'blur'
          }
        ];
      }
    },
    identifyRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ];
      }
    }
  },
  data () {
    return {
      form: {
        accountName: '',
        password: '',
        identify: '',
      },
      // 显示验证码组件开关
      showIdentify: true,
      // 验证类型，1 数字，2 字母
      identifyCodeType: "1234567890", // a-zA-Z
      identifyCode: ''
    };
  },
  computed: {
    rules () {
      return {
        accountName: this.accountNameRules,
        password: this.passwordRules,
        identify: this.identifyRules,
      };
    }
  },
  mounted () {
    this.toggleIdentify();
    this.refreshCode();
  },
  methods: {
    toggleIdentify () {
      if (this.showIdentify) {
        let formItem = document.querySelectorAll(".ivu-form-item");
        for (let i = 0; i < formItem.length; i++) {
          formItem[i].style.margin = "12px 0";
        }
      }
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let arr = ["'", 'xor', 'or', '--', '#', 'select', 'and'];
          if (arr.includes(this.form.accountName || arr.includes(this.form.password))) {
            this.$Message.error('用户名或密码存在不合法字符');
            return;
          }
          if (this.showIdentify) {
            if (this.form.identify !== this.identifyCode) {
              this.form.identify = "";
              this.refreshCode();
              this.$Message.error('请输入正确的验证码');
              return;
            }
          }
          this.$emit('on-success-valid', {
            accountName: this.form.accountName,
            password: this.form.password
          });
          this.refreshCode();
        }
      });
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 初始化验证码
    refreshCode () {
      this.form.identify = "";
      this.identifyCode = "";
      this.makeCode(4);
    },
    // 随机切换验证码
    makeCode (len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode +=
          this.identifyCodeType[
          this.randomNum(0, this.identifyCodeType.length)
          ];
      }
    },
  }
};
</script>