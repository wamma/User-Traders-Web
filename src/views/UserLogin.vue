<template>
  <div>
    <v-card width="360" class="mx-auto ">
      <div v-if="!isLoginError">
        <v-card-title>
          <h3
            class="pb-3"
            style="color:#ff6d00; margin-left:21%;font-size:xx-large;font-weight:bold;
            border-bottom:solid; border-width:0.5px; border-color: #cccccc;
          "
          >
            User Traders
          </h3>
        </v-card-title>
      </div>
      <div v-else>
        <v-card-title style="background-color: #FF3232">
          <h3 style="color: white">이메일과 비밀번호를 확인해주세요</h3>
        </v-card-title>
      </div>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            autocomplete="off"
            v-model="email"
            :rules="emailRules"
            label="이메일"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>
          <v-text-field
            autocomplete="off"
            v-model="password"
            label="비밀번호"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <!-- <v-btn color="grey" class="mr-9 white--text" @click="reset">
					Reset
					<v-icon right>mdi-backup-restore</v-icon>
				</v-btn> -->
        <v-btn color="green" class="white--text" @click="reset">
          비밀번호 찾기
          <v-icon right>mdi-backup-restore</v-icon>
        </v-btn>

        <v-btn
          :disabled="!valid"
          color="#ff6d00"
          class="ml-9 mr-2 white--text"
          @click="loginSubmit"
        >
          로그인
          <v-icon right>mdi-arrow-right-thick</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'SignUp' }" color="#ff6d00" class="white--text">
          회원가입
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "이메일을 입력해주세요.",
      (v) => /.+@.+\..+/.test(v) || "이메일 형식에 맞게 입력해주세요.",
    ],
    password: "",
    passwordRules: [(v) => !!v || "비밀번호를 입력해주세요."],
  }),
  computed: {
    ...mapState({
      isLogin: (state) => state.users.isLogin,
      isLoginError: (state) => state.users.isLoginError,
    }),
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    loginSubmit() {
      const loginObj = { email: this.email, password: this.password };
      if (
        loginObj.email == "" ||
        loginObj.password == "" ||
        loginObj.email == null ||
        loginObj.password == null ||
        loginObj.email == undefined ||
        loginObj.password == undefined
      ) {
        alert("이메일이나 비밀번호를 입력해주세요.");
        return;
      }
      this.postUserLogin(loginObj).then(() => {
        this.$router.push(this.$route.query.redirect || "/");
        this.isLoading = false;
      });
    },

    ...mapActions({
      postUserLogin: "auth/postUserLogin",
    }),
  },
};
</script>
