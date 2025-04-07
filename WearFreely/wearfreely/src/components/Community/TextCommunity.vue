<template>
  <div class="text-community">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <h3>{{ article.title }}</h3>
      <p class="author">作者: {{ article.author }}</p>
      <p class="content">{{ article.content }}</p>
      <div class="meta">
        <span class="likes">
            <img v-if="dzlikes[article.id - 1]" src='@/assets/community/dianzantrue.svg' alt="成功点赞" @click="() => giveLike(article.id)">
            <img v-if="!dzlikes[article.id - 1]" src='@/assets/community/dianzan.svg' alt="取消点赞" @click="() => giveLike(article.id)">
            {{ article.likes }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const articles = [
  {
    id: 1,
    title: "春季穿搭指南：如何搭配轻薄外套",
    author: "时尚达人",
    content: "春季气温多变，一件轻薄外套是必备单品。建议选择米色或浅灰色风衣，内搭纯色T恤和牛仔裤，既保暖又时尚。",
    likes: 128
  },
  {
    id: 2,
    title: "职场穿搭：如何打造专业形象",
    author: "职场精英",
    content: "选择剪裁得体的西装套装，搭配简约的衬衫和皮鞋。颜色上推荐深蓝、深灰等沉稳色调，配饰不宜过多。",
    likes: 95
  },
  {
    id: 3,
    title: "夏日清凉穿搭技巧",
    author: "夏日时尚",
    content: "棉麻材质的衣物是夏季首选，透气舒适。搭配浅色系如白色、浅蓝等，视觉上更显清凉。",
    likes: 156
  },
  {
    id: 4,
    title: "秋冬叠穿法则：保暖又时尚",
    author: "穿搭达人",
    content: "秋冬季节叠穿是关键，内搭高领毛衣，中层选择针织开衫，外套搭配大衣或羽绒服，层次感十足。",
    likes: 210
  },
  {
    id: 5,
    title: "约会穿搭：如何给人留下好印象",
    author: "恋爱顾问",
    content: "初次约会建议选择温柔色系，女生可以穿连衣裙配小外套，男生可选择休闲西装或衬衫配牛仔裤。",
    likes: 178
  },
  {
    id: 6,
    title: "运动休闲风搭配技巧",
    author: "健身教练",
    content: "运动休闲风要兼顾舒适与时尚，推荐卫衣搭配运动裤或瑜伽裤，鞋子选择老爹鞋或运动鞋。",
    likes: 145
  },
  {
    id: 7,
    title: "商务休闲穿搭指南",
    author: "职场顾问",
    content: "商务休闲可选择西装外套配针织衫，下装可选卡其裤或休闲西裤，鞋子推荐乐福鞋或切尔西靴。",
    likes: 132
  },
  {
    id: 8,
    title: "小个子显高穿搭秘籍",
    author: "形象设计师",
    content: "小个子建议选择高腰裤或高腰裙，上衣选择短款，鞋子可选尖头鞋或高跟鞋，整体比例更显修长。",
    likes: 167
  },
  {
    id: 9,
    title: "微胖女生显瘦穿搭",
    author: "形象顾问",
    content: "选择V领或方领上衣，下装选择直筒裤或A字裙，避免紧身衣物，颜色上深色系更显瘦。",
    likes: 189
  },
  {
    id: 10,
    title: "旅行穿搭：舒适与美观兼顾",
    author: "旅行达人",
    content: "旅行穿搭要舒适耐穿，推荐牛仔裤配T恤和外套，鞋子选择运动鞋或马丁靴，方便行走又时尚。",
    likes: 156
  },
  {
    id: 11,
    title: "复古风穿搭指南",
    author: "复古爱好者",
    content: "复古风可选择高腰牛仔裤配印花衬衫，外套选择牛仔夹克或皮衣，配饰选择复古墨镜和皮带。",
    likes: 143
  },
  {
    id: 12,
    title: "极简主义穿搭法则",
    author: "极简生活",
    content: "极简穿搭选择基础款单品，颜色以黑白灰为主，注重剪裁和质感，打造简约高级感。",
    likes: 167
  },
  {
    id: 13,
    title: "派对穿搭：如何成为焦点",
    author: "派对达人",
    content: "派对穿搭可选择亮片裙或丝绒西装，配饰选择夸张耳环或领结，鞋子可选高跟鞋或漆皮鞋。",
    likes: 198
  }
];
const dzlikes = ref(articles.map(() => false));
function giveLike(articleId) {
    const index = articles.findIndex(a => a.id === articleId);
    if (index !== -1) {
        dzlikes.value[index] = !dzlikes.value[index];
        articles[index].likes += dzlikes.value[index] ? 1 : -1;
    }
}
</script>

<style scoped>
.text-community {
  padding: 20px;
}
.article-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.article-card h3 {
  margin-top: 0;
  color: #333;
}
.author {
  color: #666;
  font-size: 0.9em;
}
.content {
  margin: 10px 0;
  line-height: 1.5;
}
.meta {
  display: flex;
  justify-content: flex-end;
}
.likes {
  color: gray;
}
</style>