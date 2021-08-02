<template>
  <article class="about-page article flex--s-s">
    <div class="article__content">
      <div class="article__content--body flex--s">
        <div class="--header flex--s">
          <div class="profile">
            <h1>Profile</h1>
            <p>北海道工業大学の建築学科を卒業し、ハウスメーカーや工務店を通し建築のさまざまな分野に身を置きスキルを磨いたが、2020年のコロナ大流行により、勤務していた会社の人員削減で2020年10月に退職、その会社でWEB広報やサイト更新等を担当した事や元々興味のあったWEB業界について独学をしつつ職業能力開発センターを通して多くの言語の基礎知識を取得した。と信じている。</p>
            <dl>
              <div class="flex--s-s">
                <dt>趣味</dt>:<dd>キャンプ・インド旅行・死んだように眠る</dd>
              </div>
              <div class="flex--s-s">
                <dt>特技</dt>:<dd>子供と犬に好かれやすい</dd>
              </div>
            </dl>
          </div>
          <div class="img--container">
            <AtomsImage alt="似てない自画像" src="" />
          </div>
        </div>
        <div class="--appeal flex--s-s">
          <div class="appeal">
            <h2 class="border-dash">
              Appeal
            </h2>
            <p>
              建築職で培った『適した材料』や『適した技術』を探し、
              それらの特性を学ぶことで適切な使用方や材料の新たな組み合わせに発展させることが活かすことが得意。
              独学期間中は自身に適した技術を探すため様々な言語のエラーの海へと飛び込み今もなお溺れ続けている。
              その中でも特に一つの技術に拘らず、常に時代によって進化していくWEB業界を興味を持ち、フロントエンドやバックエンド技術の組み合わせによって
              より良いものを作り上げることに尽力したい。
            </p>
            <p>
              なお、趣味のインド旅行にIT留学的な意味合いはなく、Tシャツ短パンでガンジス川に飛び込む一般的な北インド旅である。
            </p>
          </div>
        </div>
        <div class="--skill flex--s-s">
          <div class="language">
            <h2 class="border-dash">
              Language
            </h2>
            <p>※2021年8月現在、業界における実務経験は皆無のため取得した技能の指標は<strong>基本的なレベルかどうか</strong>によるもの</p>
            <table>
              <thead>
                <tr class="cl-secoundary">
                  <th>言語</th>
                  <th>自己評価</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HTML</td>
                  <td>★★★★★</td>
                  <td>基本的なタグや構造化（セマンティクスなタグや、JSON-LD等）についての知識はあるが、canvasタグ等での3d埋め込みはThreeJS等でしか使用していない等まだ知識が足りていない部分がある。またaria等のアクセシビリティ属性について勉強中。</td>
                </tr>
                <tr>
                  <td>CSS / Sass(SCSS)</td>
                  <td>★★★★★</td>
                  <td>@mixin等の基本的なディレクティブは使用可能。</td>
                </tr>
                <tr>
                  <td>PHP</td>
                  <td>★★★★☆</td>
                  <td>JAVAやCとの違いやその利点を理解しており、一通りクラスやトレイト、関数等使用できる。</td>
                </tr>
                <tr>
                  <td>JAVA</td>
                  <td>★★★★☆</td>
                  <td>静的型付け言語の方が好みであるためPHPよりも好きだが、JAVA関連のフレームワークは学習していない。</td>
                </tr>
                <tr>
                  <td>Javascript / Typescript</td>
                  <td>★★★★★</td>
                  <td>JSを学んだ後、Tsへと移行したため問題なく動かせる。静的型付けのTsの方が好み。</td>
                </tr>
                <tr>
                  <td>C言語</td>
                  <td>★★★★☆</td>
                  <td>職業能力開発センターにて初めて指導員の下で学んだ言語。ポインタや構造体特に問題ないが経験がないため、関数の知識が足りない。</td>
                </tr>
                <!-- <tr>
                  <td>C#</td>
                  <td>★★☆☆☆</td>
                  <td>ある程度JAVAとの違いを理解しているもののUnityを触った時に少し触った程度ではあるものの興味はある。</td>
                </tr> -->
                <tr>
                  <td>Git</td>
                  <td>★★★☆☆</td>
                  <td>コミットするためのコマンドやブランチ等が分かるためGitBashを用いてGitHubレポジトリにコミットしているがそれ以外のコマンドは詳しくはわかっていない。</td>
                </tr>
                <tr>
                  <td>MySQL</td>
                  <td>★★★★★</td>
                  <td>SQLで直接クエリを叩くことが出来、触ったことがあるPostgreSQLやSQLiteよりは得意</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="framework">
            <h2 class="border-dash">
              Framework
            </h2>
            <p>※2021年8月現在、業界における実務経験は皆無のため取得した技能の指標は<strong>基本的なレベルかどうか</strong>によるもの</p>
            <table>
              <thead>
                <tr class="cl-secoundary">
                  <th>フレームワーク</th>
                  <th>自己評価</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VueJS</td>
                  <td>★★★★☆</td>
                  <td>Javascriptの学習を兼ねて当サイトのバックエンドUIとして使用した。基本的な構造は凡そのvueタグを理解しているがVuexはまだ触っていない。</td>
                </tr>
                <tr>
                  <td>NuxtJS</td>
                  <td>★★★★☆</td>
                  <td>Typescriptの学習のため当サイトのフロントエンドとして使用した。Vueと同等に扱うことができる。</td>
                </tr>
                <tr>
                  <td>NodeJS</td>
                  <td>★★☆☆☆</td>
                  <td>npmによるコマンドを使用することが出来るが、NodeJSのみでサーバー構築するための知識はない。</td>
                </tr>
                <tr>
                  <td>Laravel (PHP)</td>
                  <td>★★★★☆</td>
                  <td>PHPの学習として当サイトのバックエンドとして使用した。基本的なMVC操作が可能でLaravelBladeやAPIミドルウェア、Eloquent等使用することが可能。ServiceProviderに関してやや知識不足。</td>
                </tr>
                <tr>
                  <td>Wordpress (PHP)</td>
                  <td>★☆☆☆☆</td>
                  <td>当サイトのDBを構築する際にDB構造を参考にしたことはあるが、基本的に重い印象があり使用したことがない。</td>
                </tr>
                <tr>
                  <td>baserCMS (PHP)</td>
                  <td>★★☆☆☆</td>
                  <td>日本製ということもありPHP独学の際に少し学習したため、多少使用することが出来る。</td>
                </tr>
                <tr>
                  <td>Android (JAVA)</td>
                  <td>★★★☆☆</td>
                  <td>JAVA学習のためSwingをGUI無しで使用した経験があるため、かなり得意ではあるもののKotlinは触ったことがない。</td>
                </tr>
                <!-- <tr>
                  <td>unity (C#)</td>
                  <td>★☆☆☆☆</td>
                  <td>C#学習のため使おうと考えたが、C#よりも単にunity自体の学習がほとんどであったため中断。</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div id="Anchor" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.about-page {
  $content_width: 100px;
  .article {
    &__content{
      max-width: $content_width*10 + 40px;
      flex-grow: 1;

      &--header {
        margin:0;
        margin-bottom: 2rem;
        padding: 2rem;
        p{margin: 0;padding: 0;}
      }
      &--body {
        margin: 0;
        padding: 2rem;

        word-break: break-word;
        p{text-indent: 1.2rem;}
      }
    }
  }
  #Anchor {
    flex-grow: 1;
    min-width: $content_width *4;
    max-width: $content_width *2;
    margin-left: 2rem;
  }

  .article__content--body{
    > div {
      margin-bottom: 3rem;
    }
    .border-dash{
      border-bottom: dashed 2px;
    }

    .--header{
      .profile {
        flex-grow: 6;
        max-width: $content_width * 6.8;
        margin-right: 2rem;
        h1 { border-bottom: solid 2px;}
        dl {
          padding-left: 3rem;
          dt {
            display:list-item;
            list-style: square;
          }
        }
      }
      .img--container{
        flex-grow: 4;
        min-width: $content_width *3;
        height: $content_width *4;
      }
    }

    .--appeal {
      .appeal {
        h2 { width: 100%;}
      }
    }

    .--skill {
      .language {
        margin-bottom: 3rem;
      }
      thead th{
        padding:1.5rem 0;
        &:first-child {width: 20%;}
        &:nth-child(2) {min-width: $content_width *0.6;}
        &:last-child {width: 70%;}
      }
      tbody {
        td{
          border-bottom: dotted 1px;
          padding:1.5rem 0;
          &:nth-child(2) {
            text-align: center;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
