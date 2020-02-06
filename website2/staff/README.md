---
title: JavaScript Bangkok 1.0.0 Staff List
urls:
  Arnon Kaewprasert: https://github.com/ninxxxxx
  Chakrit Likitkhajorn: https://medium.com/@chrisza
  Mahatthana Nomsawadi: https://github.com/WiNloSt
  Palangkul Wattanakul: https://github.com/Gnax49
  Panjamapong Sermsawatsri: https://github.com/PanJ
  Siwat Kaolueng: https://perjerz.me
  Tananan Tangthanachaikul: https://microbenz.in.th/
  Thai Pangsakulyanont: https://dt.in.th/
  Thunyaporn Samrankase: thunya-sam.com
  Wutichai Saejao: https://github.com/wootsaejao
staffRoll:
  - title: Executive producer
    list:
      - Panjamapong Sermsawatsri
  - title: Event Branding
    list:
      - Jirayut Leeupathumwong
      - Wasit Jingjit
  - title: Content
    list:
      - Thai Pangsakulyanont
      - Tananan Tangthanachaikul
      - Mahatthana Nomsawadi
      - Chakrit Likitkhajorn
  - title: Public Relations
    list:
      - Tananan Tangthanachaikul
  - title: Logistics
    roles:
      - role: Organizers
        list:
          - Jinsiree Palakawongsa Na Ayudhya
      - role: Accounting
        list:
          - Panjamapong Sermsawatsri
      - role: Venue coordinator
        list:
          - Wutichai Saejao
          - Arnon Kaewprasert
      - role: Food and Beverages
        list:
          - Siwat Kaolueng
      - role: Scholarship
        list:
          - Mahatthana Nomsawadi
          - Arnon Kaewprasert
  - title: Development
    roles:
      - role: Architect
        list:
          - Thai Pangsakulyanont
      - role: Web designer
        list:
          - Wasit Jingjit
      - role: Website developer
        list:
          - Runyasak Chaengnaimuang
          - Thanyaboon Tovorapan
          - Siriwat Kunaporn
          - Chonnipa Kittisiriprasert
      - role: Companion app developer
        list:
          - Norapat Buppodom
          - Patcharapat Chaijaroen
          - Wasin Phandsupatavorn
          - Patthanat Thanintantrakun
      - role: Quality engineer
        list:
          - Phakamas Jitsopeepong
  - title: Souvenirs
    roles:
      - role: Swags and sales
        list:
          - Thunyaporn Samrankase
          - Palangkul Wattanakul
      - role: T-shirt
        list:
          - Vorrawut Judasri
          - Phatcharaphan Ananpreechakun
---

<div style="text-align: center">

# JavaScript Bangkok 1.0.0 Staff List

<section v-for="section of $page.frontmatter.staffRoll">
  <h2>{{ section.title }}</h2>
  <div v-for="name of section.list || []">
    <template v-if="$page.frontmatter.urls[name]">
      <a :href="$page.frontmatter.urls[name]">{{name}}</a>
    </template>
    <template v-else>
      {{name}}
    </template>
  </div>
  <table v-if="section.roles" style="margin: 0 auto">
    <tbody>
      <tr v-for="role of section.roles">
        <td style="text-align: right; padding-right: 1ex; vertical-align: top;">{{role.role}}</td>
        <td style="text-align: left">
          <div v-for="name of role.list || []">
            <template v-if="$page.frontmatter.urls[name]">
              <a :href="$page.frontmatter.urls[name]">{{name}}</a>
            </template>
            <template v-else>
              {{name}}
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</section>

</div>

<style scoped>
a:not(:hover) {
  color: inherit;
  text-decoration: none;
}
</style>
