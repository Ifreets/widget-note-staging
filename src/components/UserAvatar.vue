<template>
  <img
    @error="onImageError"
    @load="removeAnimatePulse"
    loading="lazy"
    v-if="avatar"
    :src="avatar"
    :alt="$props.public_profile?.client_name || 'Avatar'"
    class="w-full h-full overflow-hidden bg-slate-200 rounded-oval object-cover"
  />

  <div
    v-else
    :class="animate_pulse"
    class="overflow-hidden bg-slate-200 rounded-oval object-cover"
  >
    <div
      v-if="
        $props.public_profile?.client_name && getPlatformType() === 'WEBSITE'
      "
      :style="{ background: letterToColorCode() }"
      class="w-full h-full flex justify-center items-center font-semibold text-white rounded-oval"
    >
      {{ nameToLetter($props.public_profile?.client_name || "") }}
    </div>
    <img
      v-else-if="getPlatformType() === 'FB_MESS'"
      @error="onImageError"
      @load="removeAnimatePulse"
      loading="lazy"
      :src="loadImageUrl()"
      :alt="$props.public_profile?.client_name || 'Avatar'"
      class="w-full h-full rounded-oval object-cover"
    />
    <img
      v-else-if="getPlatformType() === 'FB_INSTAGRAM'"
      @error="onImageError"
      @load="removeAnimatePulse"
      loading="lazy"
      :src="loadImageUrl('FB_INSTAGRAM')"
      :alt="$props.public_profile?.client_name || 'Avatar'"
      class="w-full h-full rounded-oval object-cover"
    />
    <img
      v-else-if="getPlatformType() === 'TIKTOK'"
      @error="onImageError"
      @load="removeAnimatePulse"
      loading="lazy"
      :src="loadImageUrl('TIKTOK')"
      :alt="$props.public_profile?.client_name || 'Avatar'"
      class="w-full h-full rounded-oval object-cover"
    />
    <img
      v-else-if="getPlatformType() === 'ZALO_OA' && getClientAvatar()"
      @error="onImageError"
      @load="removeAnimatePulse"
      loading="lazy"
      :src="getClientAvatar()"
      :alt="$props.public_profile?.client_name || 'Avatar'"
      class="w-full h-full rounded-oval object-cover"
    />
    <img
      v-else-if="getPlatformType() === 'ZALO_PERSONAL' && getClientAvatar()"
      @error="onImageError"
      @load="removeAnimatePulse"
      loading="lazy"
      :src="getClientAvatar()"
      :alt="$props.public_profile?.client_name || 'Avatar'"
      class="w-full h-full rounded-oval object-cover"
    />
    <div
      v-else
      :style="{ background: letterToColorCode() }"
      class="w-full h-full flex justify-center items-center font-semibold text-white rounded-oval"
    >
      {{ nameToLetter($props.public_profile?.client_name || "") }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { nameToLetter } from "@/services/helper/format";
import { Cdn, SingletonCdn, type ICdn } from "@/utils/helper/Cdn";
import { onMounted, ref } from "vue";

import type { PageType } from "@/interface/app/page";
import type { ICustomerInfo } from "@/interface/widget";
import { container } from "tsyringe";

const $cdn = SingletonCdn.getInst();
/** Các nền tảng có avatar */
const NO_AVT_PLATFORMS = ["ZALO", "TIKTOK"];

const $props = withDefaults(
  defineProps<{
    /**kích thước thực tế của hình ảnh */
    actual_size?: number;
    /**dữ liệu bình luận */
    comment?: any;
    /**link avt để dùng luôn */
    avatar?: string;
    /**thông tin public profile từ API response */
    public_profile?: ICustomerInfo["public_profile"];
    /**loại nền tảng từ conversation_message */
    platform_type?: string;
  }>(),
  {
    actual_size: 64,
  },
);

/**thêm hiệu ứng ẩn hiện khi ảnh đang được load */
const animate_pulse = ref("animate-pulse");

onMounted(() => {
  /** tắt hiệu ứng với dạng web */
  if (getPlatformType() === "WEBSITE") removeAnimatePulse();
  /** tắt hiệu ứng với các nền tảng không có avatar */
  if (
    NO_AVT_PLATFORMS.some((p) => getPlatformType()?.includes(p)) &&
    !getClientAvatar()
  ) {
    removeAnimatePulse();
  }
});

/**lấy loại nền tảng từ platform_type prop */
function getPlatformType() {
  return $props.platform_type || "";
}

/**lấy avatar khách hàng từ public_profile */
function getClientAvatar() {
  return $props.public_profile?.client_avatar || "";
}

/**lấy fb_page_id từ public_profile */
function getFbPageId() {
  return (
    $props.public_profile?.fb_page_id || $props.public_profile?.page_id || ""
  );
}

/**lấy fb_client_id từ public_profile */
function getFbClientId() {
  return $props.public_profile?.fb_client_id || "";
}

/**tạo bg dựa trên chữ cái */
function letterToColorCode() {
  let character = $props.public_profile?.client_name || "";

  // nếu không có tên thì trả về màu mặc định
  if (!character) return "rgb(212, 219, 255)";

  // lấy chữ cái đầu tiên và Chuyển ký tự thành chữ thường
  const INPUT = character?.charAt(0).toLowerCase();

  // Chuyển đổi ký tự thành mã màu, Lấy mã Unicode và trừ đi mã 'a' (97)
  let charCode = (INPUT?.charCodeAt(0) || 0) - 97;

  // Chuyển đổi số nguyên thành giá trị RGB
  var red = (charCode * 30) % 256;
  var green = (charCode * 20) % 256;
  var blue = (charCode * 10) % 256;

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
/**tắt hiệu ứng ẩn hiện khi ảnh load thành công */
function removeAnimatePulse() {
  animate_pulse.value = "";
}
/**tạo url ảnh */
function loadImageUrl(platform_type?: PageType) {
  const PARAMS = `?width=${$props.actual_size * 2}&height=${
    $props.actual_size * 2
  }`;

  const PAGE_ID = getFbPageId();
  const CLIENT_ID = getFbClientId();

  if (platform_type === "FB_INSTAGRAM")
    return $cdn.igClientAvt(PAGE_ID, CLIENT_ID) + PARAMS;
  if (platform_type === "TIKTOK") {
    return $cdn.tiktokClientAvt(PAGE_ID, CLIENT_ID) + PARAMS;
  }
  return $cdn.fbClientAvt(PAGE_ID, CLIENT_ID) + PARAMS;
}
/**khi ảnh load thất bại thì thay thế ảnh mặc định vào */
function onImageError($event: Event) {
  /** Thẻ img đang bị lỗi load ảnh */
  const image = $event.target as HTMLImageElement;

  // Nếu url ảnh hiện tại đã là ảnh mặc định rồi thì dừng lại để tránh lặp vô hạn
  if (image.src.includes("1111111111")) {
    return;
  }
  /** Đường dẫn ảnh mặc định fallback */
  const FALLBACK_SRC =
    "https://chatbox-static-v3.botbanhang.vn/app/facebook/avatar/1111111111?width=64&height=64";
  // Gán lại src của ảnh bằng đường dẫn mặc định
  image.src = FALLBACK_SRC;
}

class Main {
  /**
   * @param SERVICE_CDN dịch vụ cdn
   */
  constructor(private readonly SERVICE_CDN: ICdn = container.resolve(Cdn)) {}

  /**lấy avt của người gửi của bình luận này */
  loadCommentFromAvatar() {
    // nếu không có bình luận thì trả về rỗng
    if (!$props.comment) return "";

    /**id trang */
    const PAGE_ID = getFbPageId();
    /**id người gửi */
    const FROM_ID = $props.comment?.from?.id;

    // trả về url ảnh
    return (
      this.SERVICE_CDN.fbClientAvt(PAGE_ID, FROM_ID) +
      `?width=${$props.actual_size * 2}&height=${$props.actual_size * 2}`
    );
  }
}
const MAIN = new Main();
void MAIN;
</script>
