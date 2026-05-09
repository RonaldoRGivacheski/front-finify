<script lang="ts" setup>
import type {
  CaptchaVerifyPassingData,
  SliderCaptchaActionType,
} from '@vben/common-ui';

import { ref } from 'vue';

import { Page, SliderCaptcha } from '@vben/common-ui';
import { Bell, Sun } from '@vben/icons';

import { Button, Card, message } from 'ant-design-vue';

function handleSuccess(data: CaptchaVerifyPassingData) {
  const { time } = data;
  message.success(`Verification successful, time consuming ${time} seconds`);
}
function handleBtnClick(elRef?: SliderCaptchaActionType) {
  if (!elRef) {
    return;
  }
  elRef.resume();
}

const el1 = ref<SliderCaptchaActionType>();
const el2 = ref<SliderCaptchaActionType>();
const el3 = ref<SliderCaptchaActionType>();
const el4 = ref<SliderCaptchaActionType>();
const el5 = ref<SliderCaptchaActionType>();
const el6 = ref<SliderCaptchaActionType>();
</script>

<template>
  <Page
    description="Used for simple drag-and-drop validation scenarios on the front end."
    title="Slider verification"
  >
    <Card class="mb-5" title="Basic example">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha ref="el1" @success="handleSuccess" />
        <Button class="ml-2" type="primary" @click="handleBtnClick(el1)">
          Reset
        </Button>
      </div>
    </Card>
    <Card class="mb-5" title="自定义圆角">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha
          ref="el2"
          class="rounded-full"
          @success="handleSuccess"
        />
        <Button class="ml-2" type="primary" @click="handleBtnClick(el2)">
          Reset
        </Button>
      </div>
    </Card>
    <Card class="mb-5" title="Custom background color">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha
          ref="el3"
          :bar-style="{
            backgroundColor: '#018ffb',
          }"
          success-text="verification successful"
          text="Drag to verify"
          @success="handleSuccess"
        />
        <Button class="ml-2" type="primary" @click="handleBtnClick(el3)">
          Reset
        </Button>
      </div>
    </Card>
    <Card class="mb-5" title="Custom drag icon">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha ref="el4" @success="handleSuccess">
          <template #actionIcon="{ isPassing }">
            <Bell v-if="isPassing" />
            <Sun v-else />
          </template>
        </SliderCaptcha>
        <Button class="ml-2" type="primary" @click="handleBtnClick(el4)">
          Reset
        </Button>
      </div>
    </Card>
    <Card class="mb-5" title="Custom text">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha
          ref="el5"
          success-text="verification successful"
          text="Drag to verify"
          @success="handleSuccess"
        />
        <Button class="ml-2" type="primary" @click="handleBtnClick(el5)">
          Reset
        </Button>
      </div>
    </Card>
    <Card class="mb-5" title="Custom content (slot)">
      <div class="flex-center p-4 px-[30%]">
        <SliderCaptcha ref="el6" @success="handleSuccess">
          <template #text="{ isPassing }">
            <template v-if="isPassing">
              <Bell class="mr-2 size-4" />
              verification successful
            </template>
            <template v-else>
              Drag to verify
              <Sun class="ml-2 size-4" />
            </template>
          </template>
        </SliderCaptcha>
        <Button class="ml-2" type="primary" @click="handleBtnClick(el6)">
          Reset
        </Button>
      </div>
    </Card>
  </Page>
</template>
