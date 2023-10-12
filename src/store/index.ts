import type { App } from "vue";

import { createPinia } from "pinia";
import useLoginStore from "./login/login";

const pinia = createPinia();

function refisterStore(app: App<Element>) {
  app.use(pinia);

  // 加载本地数据
  const loginStore = useLoginStore();
  loginStore.loadLocalCacheAction();
}

export default refisterStore;
