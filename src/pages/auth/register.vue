<template>
    <div class="page-register">
        <section>
            <div class="logo">
                <h1>Recetas</h1>
            </div>
            <div class="form-register">
                <van-form @submit.prevent="onSubmit">
                    <van-cell-group inset>
                        <van-field v-model="form.name" type="text" name="name" label="Nombre" placeholder="Nombre" />
                        <van-field v-model="form.email" type="email" name="email" label="Email" placeholder="Email" />
                        <van-field v-model="form.password" type="password" name="password" label="Contraseña"
                            placeholder="Contraseña" />
                        <van-field v-model="form.password_confirmation" type="password" name="password"
                            label="Confirmar contraseña" placeholder="Confirmar contraseña" />
                    </van-cell-group>
                    <div class="action-buttons">
                        <div class="link-page-login" @click="pageLogin">
                            <p>¿Ya tienes cuenta? <span>Iniciar Sesión</span></p>
                        </div>
                        <div class="btn-register">
                            <button-submit @on-submit="onSubmit">
                                Registrarse
                            </button-submit>
                        </div>
                    </div>
                </van-form>
            </div>
        </section>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import Form from '../../classes/Form';

// Composables
import { usePush } from '../../composables/push.js';

// Componentes
import buttonSubmit from '../../components/buttonSubmit.vue';

// data
const form = reactive(new Form({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
}));

const { redirectPush } = usePush();

// Methods
const onSubmit = () => {
    console.log(form.data())

};

const pageLogin = () => {
    redirectPush('login');
}


</script>
<style lang='scss' scoped>
.page-register {
    .logo {
        h1 {
            text-align: center;
            font-size: 3rem;
        }
    }

    .form-register {
        .action-buttons {
            margin: 0rem 1rem 0rem 1rem;
        }

        .link-page-login {
            cursor: pointer;
            text-align: end;
        }
    }
}
</style>