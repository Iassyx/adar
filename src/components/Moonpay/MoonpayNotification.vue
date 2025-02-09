<template>
  <dialog-base :visible.sync="visibility" class="moonpay-dialog">
    <template #title>
      <moonpay-logo :theme="libraryTheme" />
    </template>
    <simple-notification :success="success" @close="close">
      <template #title>{{ title }}</template>
      <template #text><div v-html="text" /></template>
    </simple-notification>
  </dialog-base>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { components } from '@soramitsu/soraneo-wallet-web';
import type Theme from '@soramitsu/soramitsu-js-ui/lib/types/Theme';

import TranslationMixin from '@/components/mixins/TranslationMixin';
import { lazyComponent } from '@/router';

import MoonpayLogo from '@/components/logo/Moonpay.vue';

import { mutation, state, getter } from '@/store/decorators';
import { Components } from '@/consts';
import { MoonpayNotifications } from './consts';

@Component({
  components: {
    DialogBase: components.DialogBase,
    MoonpayLogo,
    SimpleNotification: lazyComponent(Components.SimpleNotification),
  },
})
export default class MoonpayNotification extends Mixins(TranslationMixin) {
  @state.moonpay.notificationKey private notificationKey!: MoonpayNotifications;
  @state.moonpay.notificationVisibility private notificationVisibility!: boolean;
  @getter.libraryTheme libraryTheme!: Theme;

  @mutation.moonpay.setNotificationVisibility private setNotificationVisibility!: (flag: boolean) => void;

  get visibility(): boolean {
    return this.notificationVisibility;
  }

  set visibility(flag: boolean) {
    this.setNotificationVisibility(flag);
  }

  get success(): boolean {
    return this.notificationKey === MoonpayNotifications.Success;
  }

  get title(): string {
    if (!this.notificationKey) return '';
    return this.t(`moonpay.notifications.${this.notificationKey}.title`);
  }

  get text(): string {
    if (!this.notificationKey) return '';
    return this.t(`moonpay.notifications.${this.notificationKey}.text`);
  }

  close(): void {
    this.visibility = false;
  }
}
</script>
