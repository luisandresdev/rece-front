<template>
    <div class="page-login">
        <section>
            <div class="logo">
                <h1>Recetas</h1>
            </div>
            <div class="form-login">
                <van-form @submit.prevent="onSubmit">
                    <van-cell-group inset>
                        <van-field v-model="form.email" type="email" name="email" label="Email" placeholder="Email" />
                        <van-field v-model="form.password" type="password" name="password" label="Contraseña"
                            placeholder="Contraseña" />
                    </van-cell-group>
                    <div class="action-buttons">
                        <div class="link-page-register" @click="pageRegister">
                            <p>¿No tienes cuenta? <span>Registrarse</span></p>
                        </div>
                        <div class="btn-login">
                            <button-submit @on-submit="onSubmit">
                                Iniciar Sesión
                            </button-submit>
                        </div>
                    </div>
                </van-form>
            </div>
        </section>
        <van-notify v-model:show="showNotifyMessage" type="danger"></van-notify>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Form from '../../classes/Form';
import AuthService from '../../services/AuthService';
import { showNotify } from 'vant';
// Composables
import { usePush } from '../../composables/push.js';

// Componentes
import buttonSubmit from '../../components/buttonSubmit.vue';

// data
const showNotifyMessage = ref(false);


// data
const form = reactive(new Form({
    email: "",
    password: "",
}));

const { redirectPush } = usePush();

// Methods
const onSubmit = () => {
    AuthService.login(form.data()).then(response => {
        if (response.status == 200) {
            redirectPush('recipes');
        }
    }).catch(error => {
        if (error.response.status == 401) {
            showNotify({ type: 'danger', message: 'El email o contraseña son incorrectos' });
        }
    })
};

const pageRegister = () => {
    redirectPush('register');
}


</script>
<style lang='scss' scoped>
.page-login {
    .logo {
        h1 {
            text-align: center;
            font-size: 3rem;
        }
    }

    .form-login {
        .action-buttons {
            margin: 0rem 1rem 0rem 1rem;
        }

        .link-page-register {
            cursor: pointer;
            text-align: end;
        }
    }
}
</style>