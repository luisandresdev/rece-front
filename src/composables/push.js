
import { useRouter } from 'vue-router';

export function usePush() {
    const router = useRouter();
    function redirectPush(name) {
        router.push({ name: name });
    };

    return {
        redirectPush,
    }
}