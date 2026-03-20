import { ActionTemplate, FamilyInput, GeneratedPlan } from "./types";

type PlanLocale = "vi" | "en";

const templateVi: Record<string, { title: string; description: string }> = {
  plan_screen_free_activity_daily: {
    title: "Lên kế hoạch một hoạt động gia đình không dùng màn hình mỗi ngày",
    description: "Tạo một hoạt động ngoại tuyến hằng ngày để cả gia đình cùng tham gia.",
  },
  track_screen_use_patterns: {
    title: "Theo dõi những hoạt động media đang chiếm quá nhiều thời gian",
    description: "Nhìn rõ thời gian đang trôi vào đâu để đưa ra lựa chọn có chủ đích hơn.",
  },
  turn_off_unused_media: {
    title: "Tắt media khi không ai thực sự đang sử dụng",
    description: "Giảm media nền và việc tiếp xúc thụ động với màn hình.",
  },
  reduce_number_of_apps: {
    title: "Giữ số lượng ứng dụng trên thiết bị gia đình ở mức gọn",
    description: "Giảm xao nhãng, cám dỗ và những thông báo không cần thiết.",
  },
  set_lock_screen_reminders: {
    title: "Dùng nhắc nhở trên màn hình khóa hoặc bộ hẹn giờ",
    description: "Dùng tín hiệu trực quan để giúp việc dừng lại dễ hơn.",
  },
  turn_off_autoplay_and_endless_feeds: {
    title: "Tắt tự động phát và hạn chế các feed cuộn vô tận",
    description: "Loại bỏ những thiết kế khiến trẻ liên tục bị kéo quay lại.",
  },
  set_media_time_limits: {
    title: "Đặt giới hạn thời gian dùng media rõ ràng",
    description: "Dùng ranh giới dễ đoán và ổn định cho media giải trí.",
  },
  prevent_screen_from_interrupting_activity_eating: {
    title: "Không để media chen vào vận động và ăn uống lành mạnh",
    description: "Bảo vệ vận động, bữa ăn và các nhịp sinh hoạt đời thực.",
  },
  prevent_unhealthy_gaming_habits: {
    title: "Ngăn hình thành thói quen chơi game thiếu lành mạnh",
    description: "Đặt ranh giới về thời lượng chơi, chi tiêu và ảnh hưởng cảm xúc sau khi chơi.",
  },
  find_healthier_ways_to_cope: {
    title: "Nhận ra khi trẻ dùng media để xoa dịu cảm xúc và tìm cách thay thế lành mạnh hơn",
    description: "Giảm sự phụ thuộc vào màn hình để điều hòa cảm xúc.",
  },
  be_intentional_first_device: {
    title: "Cân nhắc có chủ đích thời điểm cho con thiết bị cá nhân đầu tiên",
    description: "Trì hoãn đến khi trẻ đủ sẵn sàng và có hỗ trợ đi kèm.",
  },
  talk_about_media_regularly: {
    title: "Trò chuyện về media một cách thường xuyên",
    description: "Biến media thành chủ đề trao đổi hằng ngày thay vì điều cấm kỵ.",
  },
  discuss_upsetting_content: {
    title: "Trao đổi về những nội dung gây sốc hoặc khó chịu",
    description: "Giúp trẻ xử lý những gì trẻ nhìn thấy trên mạng.",
  },
  listen_openly: {
    title: "Lắng nghe nhau với tinh thần cởi mở",
    description: "Giữ cuộc trò chuyện không phán xét để trẻ dễ chia sẻ hơn.",
  },
  use_talk_out_louds: {
    title: "Nói thành lời cách suy nghĩ về media để làm mẫu cho trẻ",
    description: "Làm mẫu cách đặt câu hỏi, suy ngẫm và đánh giá media.",
  },
  recognize_ads_and_motives: {
    title: "Dạy trẻ nhận ra quảng cáo và động cơ thuyết phục",
    description: "Giúp trẻ nhận biết khi nội dung đang cố bán hàng, tác động hoặc thao túng.",
  },
  check_sources_and_fact_patterns: {
    title: "Kiểm tra nguồn, động cơ và độ tin cậy của thông tin",
    description: "Luyện thói quen hỏi ai tạo ra nội dung, vì sao họ tạo ra nó và kiểm chứng bằng cách nào.",
  },
  talk_about_mental_health_effects: {
    title: "Nói về cách media tác động đến cảm xúc và sức khỏe tinh thần",
    description: "Bình thường hóa việc trao đổi về áp lực, so sánh, sợ hãi và quá tải.",
  },
  respect_online_and_offline: {
    title: "Tôn trọng người khác cả trên mạng lẫn ngoài đời",
    description: "Đặt kỳ vọng rõ ràng về sự tử tế và tôn trọng trong mọi bối cảnh.",
  },
  plan_for_cyberbullying: {
    title: "Có kế hoạch ứng phó với bắt nạt trên mạng",
    description: "Đảm bảo trẻ biết phải làm gì, nói với ai và cách lưu bằng chứng.",
  },
  be_polite_considerate: {
    title: "Luyện cách cư xử lịch sự và biết nghĩ cho người khác",
    description: "Giúp trẻ mang hành vi tích cực vào cả không gian số lẫn đời thực.",
  },
  avoid_oversharing: {
    title: "Tránh chia sẻ quá mức thông tin cá nhân",
    description: "Dạy trẻ bảo vệ thông tin nhận diện, vị trí và những chi tiết nhạy cảm.",
  },
  discuss_rabbit_holes_and_bad_content: {
    title: "Nói về rabbit hole, nội dung không phù hợp và gợi ý rủi ro",
    description: "Chuẩn bị cho trẻ trước việc thuật toán có thể kéo trẻ tới nội dung không an toàn hoặc không phù hợp.",
  },
  limit_young_child_media_for_development: {
    title: "Giới hạn media ở trẻ nhỏ để không cản trở phát triển",
    description: "Bảo vệ ngôn ngữ, giấc ngủ, phát triển cảm xúc xã hội và vui chơi.",
  },
  maximize_privacy_settings: {
    title: "Đặt cài đặt quyền riêng tư ở mức an toàn cao nhất phù hợp",
    description: "Dùng mặc định an toàn cho ứng dụng, thiết bị và tài khoản.",
  },
  good_digital_citizenship: {
    title: "Trao đổi về việc trở thành một công dân số có trách nhiệm",
    description: "Kết nối hành vi trên mạng với đạo đức, trách nhiệm và cộng đồng.",
  },
  rules_for_online_chat_contacts: {
    title: "Đặt quy tắc về việc trò chuyện với ai trên mạng",
    description: "Giảm tiếp xúc không mong muốn và củng cố ranh giới an toàn.",
  },
  review_reporting_blocking_and_feed_reset: {
    title: "Thực hành chặn, báo cáo và làm mới feed không lành mạnh",
    description: "Đảm bảo trẻ biết cách rời đi, báo cáo và làm sạch các gợi ý độc hại.",
  },
  use_parental_controls_and_account_guardrails: {
    title: "Dùng kiểm soát của phụ huynh cho tải ứng dụng, liên hệ, mua sắm và quyền riêng tư",
    description: "Đặt hàng rào ở cấp thiết bị và tài khoản thay vì chỉ trông vào ý chí.",
  },
  screen_free_meals: {
    title: "Giữ bữa ăn không có màn hình",
    description: "Bảo vệ trò chuyện, nhịp sinh hoạt và ăn uống chú tâm.",
  },
  bedroom_screen_free_at_night: {
    title: "Giữ phòng ngủ không có màn hình vào ban đêm",
    description: "Giảm gián đoạn giấc ngủ và việc dùng thiết bị khuya.",
  },
  no_devices_to_from_school: {
    title: "Hạn chế dùng thiết bị trên đường đi học và về nhà khi có thể",
    description: "Tạo khoảng trống cho quan sát, suy ngẫm và trò chuyện.",
  },
  delay_social_media_until_13: {
    title: "Hoãn mạng xã hội đến 13 tuổi hoặc muộn hơn, có đồng hành của cha mẹ",
    description: "Trì hoãn quyền truy cập đến khi trẻ có mức sẵn sàng và giám sát phù hợp.",
  },
  choose_ok_screen_days: {
    title: "Chọn rõ những ngày nào được dùng màn hình giải trí",
    description: "Tạo ranh giới dễ đoán cho ngày thường và cuối tuần.",
  },
  homework_and_screens_plan: {
    title: "Có kế hoạch rõ ràng giữa bài tập và màn hình",
    description: "Quy định điều gì diễn ra trước, trong và sau khi học bài.",
  },
  use_focus_modes_for_school_and_sleep: {
    title: "Dùng chế độ tập trung hoặc không làm phiền cho việc học, thời gian gia đình và giấc ngủ",
    description: "Tắt thông báo vào những lúc trẻ cần tập trung hoặc nghỉ ngơi.",
  },
  one_screen_at_a_time: {
    title: "Chỉ dùng một màn hình tại một thời điểm",
    description: "Giảm đa nhiệm media và quá tải.",
  },
  avoid_screens_before_school: {
    title: "Tránh màn hình trước giờ đi học",
    description: "Bảo vệ nhịp buổi sáng, sự tập trung và mức sẵn sàng học tập.",
  },
  screen_free_day_each_week: {
    title: "Lên kế hoạch một ngày nhẹ màn hình hoặc không màn hình mỗi tuần",
    description: "Tạo nhịp nghỉ hằng tuần và mở chỗ cho đời sống ngoại tuyến.",
  },
  silence_phones_family_time: {
    title: "Bật không làm phiền trong giờ gia đình và giờ chơi",
    description: "Bảo vệ sự hiện diện và giảm gián đoạn.",
  },
  prevent_media_interfering_sleep: {
    title: "Không để media làm ảnh hưởng giấc ngủ",
    description: "Điều chỉnh thói quen dùng media cho phù hợp với nhịp ngủ và sự hồi phục của trẻ.",
  },
  avoid_screens_one_hour_before_sleep: {
    title: "Tránh màn hình trong một giờ trước khi ngủ",
    description: "Tạo một nhịp chuyển tiếp êm hơn trước giấc ngủ.",
  },
  be_intentional_about_media_use: {
    title: "Dùng media một cách có chủ đích",
    description: "Chọn media có cân nhắc thay vì mặc định dùng thứ dễ nhất.",
  },
  prioritize_educational_prosocial_positive: {
    title: "Ưu tiên nội dung sáng tạo, giáo dục, tích cực và giàu tính xã hội",
    description: "Chọn nội dung chậm hơn, chất lượng cao hơn, phù hợp với học tập và sức khỏe tinh thần.",
  },
  review_games_before_playing: {
    title: "Xem xét game cùng nhau trước khi mua hoặc cho chơi",
    description: "Kiểm tra nội dung, cơ chế hút tiền, tính năng chat và độ phù hợp theo tuổi.",
  },
  plan_online_spending: {
    title: "Có kế hoạch rõ ràng về chi tiêu trực tuyến",
    description: "Giảm mua sắm bốc đồng và chi tiêu trong ứng dụng.",
  },
  choose_higher_quality_lower_commercial_content: {
    title: "Chọn nội dung chất lượng cao hơn và ít mang tính thương mại hơn",
    description: "Ưu tiên nội dung chậm hơn, đáng tin hơn, ít quảng cáo hơn thay cho các feed ồn ào và thương mại hóa.",
  },
  family_experiments_try_keep_uninstall: {
    title: "Thử ứng dụng hoặc chương trình mới cùng nhau và gỡ cái không phù hợp",
    description: "Xem lựa chọn media như những thử nghiệm, không phải cam kết lâu dài.",
  },
  plan_family_movie_nights: {
    title: "Lên kế hoạch cho những buổi xem phim cùng gia đình",
    description: "Biến một phần thời gian màn hình thành thời gian kết nối gia đình.",
  },
  co_view_to_connect_and_learn: {
    title: "Cùng xem để kết nối và hỗ trợ trẻ học hỏi",
    description: "Dùng media cùng nhau và trò chuyện về điều cả nhà đang xem.",
  },
  prefer_shared_devices_for_younger_children: {
    title: "Ưu tiên thiết bị dùng chung thay vì thiết bị cá nhân ở trẻ nhỏ",
    description: "Thiết bị dùng chung giúp dễ đồng hành, giám sát và giữ ranh giới nhất quán hơn.",
  },
  play_games_watch_videos_together: {
    title: "Chơi ứng dụng, game hoặc xem video cùng nhau như một gia đình",
    description: "Biến trải nghiệm số thành điều mang tính gắn kết thay vì đơn độc.",
  },
};

const reasonVi: Record<string, string> = {
  "Core recommendation for this age group": "Khuyến nghị nền tảng phù hợp với nhóm tuổi này",
  "Matches current concern(s)": "Phù hợp với mối lo hiện tại của gia đình",
  "Fits current media use pattern": "Khớp với kiểu sử dụng media hiện tại",
  "Triggered by current family/device context": "Được kích hoạt bởi bối cảnh gia đình hoặc thiết bị hiện tại",
  "Supports stated family goals": "Hỗ trợ đúng mục tiêu gia đình đã chọn",
  "Protects an activity currently being crowded out": "Giúp bảo vệ hoạt động đang bị màn hình lấn chỗ",
  "Helps protect schoolwork and attention": "Giúp bảo vệ việc học và khả năng tập trung",
  "Makes room for offline development": "Mở thêm chỗ cho phát triển và hoạt động ngoại tuyến",
  "Supports connection that media is crowding out": "Hỗ trợ kết nối đang bị màn hình làm giảm bớt",
  "Strong fit for current sleep concerns": "Rất phù hợp với mối lo hiện tại về giấc ngủ",
  "Addresses algorithmic or feed-driven risk": "Nhắm vào rủi ro từ thuật toán, feed hoặc cuộn vô tận",
  "Responds to notification-driven disruption": "Ứng phó với gián đoạn do thông báo gây ra",
  "Responds to online contact or exploitation risk": "Ứng phó với rủi ro tiếp xúc hoặc bị lợi dụng trên mạng",
  "Supports young-child development": "Hỗ trợ nhu cầu phát triển của trẻ nhỏ",
  "Improves caregiver guidance and co-engagement": "Tăng đồng hành và hướng dẫn của cha mẹ",
};

const priorityAreaVi: Record<string, string> = {
  sleep: "Bảo vệ giấc ngủ",
  addiction: "Giảm sử dụng mang tính cưỡng bức",
  attention: "Tập trung và nề nếp",
  emotion: "Điều hòa cảm xúc",
  safety: "An toàn số",
  content_quality: "Chất lượng nội dung",
  gaming: "Chơi game lành mạnh",
  overspending: "Ranh giới chi tiêu",
  social_media: "Sẵn sàng với mạng xã hội",
};

const crowdingOutVi: Record<string, string> = {
  sleep: "Giấc ngủ",
  homework: "Bài tập và việc học",
  physical_activity: "Vận động thể chất",
  reading: "Đọc sách",
  family_time: "Thời gian gia đình",
  in_person_socializing: "Kết nối trực tiếp ngoài đời",
};

export function localizeAction(template: ActionTemplate, _locale: PlanLocale) {
  return templateVi[template.key] ?? {
    title: template.title,
    description: template.description,
  };
}

export function localizeReason(reason: string, _locale: PlanLocale) {
  return reasonVi[reason] ?? reason;
}

export function localizePriorityArea(concern: string, _locale: PlanLocale) {
  return priorityAreaVi[concern] ?? concern;
}

export function localizeCrowdingOutArea(item: string, _locale: PlanLocale) {
  return crowdingOutVi[item] ?? item;
}

export function buildLocalizedOverallSummary(input: FamilyInput): GeneratedPlan["overallSummary"] {
  const summaries: string[] = [];
  const crowdingOut = new Set(input.children.flatMap((child) => child.crowdingOut));
  const goals = new Set(input.familyGoals);

  if (crowdingOut.has("sleep") || goals.has("sleep_better")) {
    summaries.push("Kế hoạch này ưu tiên bảo vệ giấc ngủ và xây dựng nhịp buổi tối ổn định hơn.");
  }

  if (crowdingOut.has("homework") || crowdingOut.has("physical_activity") || crowdingOut.has("reading")) {
    summaries.push("Các đề xuất được thiết kế để kéo những hoạt động lành mạnh ngoài màn hình quay trở lại.");
  }

  if (
    input.children.some(
      (child) =>
        child.hasAutoplayOrEndlessScroll ||
        child.notificationsDisrupt ||
        child.chatsWithUnknownPeople,
    )
  ) {
    summaries.push("Kế hoạch này xử lý cả rủi ro từ thiết kế nền tảng như tự động phát, thông báo và tiếp xúc không an toàn.");
  }

  if (goals.has("family_connection")) {
    summaries.push("Kế hoạch này bổ sung các nhịp sinh hoạt chung và các cuộc trò chuyện giúp tăng kết nối gia đình.");
  }

  if (summaries.length < 2) {
    summaries.push("Các khuyến nghị được cá nhân hóa theo độ tuổi, mối lo, bối cảnh thiết bị và mục tiêu của gia đình.");
  }

  return summaries.slice(0, 3);
}
