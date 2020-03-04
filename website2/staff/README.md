---
title: JavaScript Bangkok 1.0.0 Staff List

# Put people in roles here...
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
      - role: Organizer
        list:
          - Jinsiree Palakawongsa Na Ayudhya
      - role: Accounting
        list:
          - Panjamapong Sermsawatsri
      - role: Venue coordinator
        list:
          - Wutichai Saejao
          - Arnon Kaewprasert
      - role: Sponsors Coordinator
        list:
          - Chinnabhorn Soonue
          - Kelwalee Patcharanunthorn
          - Punpikorn Rattanawirojkul
      - role: Food and Beverages
        list:
          - Siwat Kaolueng
      - role: Scholarship
        list:
          - Mahatthana Nomsawadi
          - Arnon Kaewprasert
          - Thohirah Husaini
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

# ...then add people URLs here (keep it sorted please)
people:
  Arnon Kaewprasert: https://github.com/ninxxxxx
  Chakrit Likitkhajorn: https://medium.com/@chrisza
  Chinnabhorn Soonue: ""
  Chonnipa Kittisiriprasert: ""
  Jinsiree Palakawongsa Na Ayudhya: ""
  Jirayut Leeupathumwong: ""
  Kelwalee Patcharanunthorn: ""
  Mahatthana Nomsawadi: https://github.com/WiNloSt
  Norapat Buppodom: ""
  Palangkul Wattanakul: https://github.com/Gnax49
  Panjamapong Sermsawatsri: https://github.com/PanJ
  Patcharapat Chaijaroen: ""
  Patthanat Thanintantrakun: ""
  Phakamas Jitsopeepong: ""
  Phatcharaphan Ananpreechakun: ""
  Punpikorn Rattanawirojkul: ""
  Runyasak Chaengnaimuang: ""
  Siriwat Kunaporn: ""
  Siwat Kaolueng: https://perjerz.me
  Tananan Tangthanachaikul: https://microbenz.in.th/
  Thai Pangsakulyanont: https://dt.in.th/
  Thanyaboon Tovorapan: ""
  Thohirah Husaini: https://github.com/thoritie
  Thunyaporn Samrankase: https://thunya-sam.com
  Vorrawut Judasri: ""
  Wasin Phandsupatavorn: ""
  Wasit Jingjit: ""
  Wutichai Saejao: https://github.com/wootsaejao
---

<div v-if="$flags.preview" style="background: white; border: 4px solid #f0f; padding: 1em;">

# Dear everyone involved in making JavaScript Bangkok 1.0.0 possible

I’d like to **make sure that everyone involved in this event got credited for their contributions.**

However I wasn’t able to remember everyone,
so if you have any information to add,
please help make this credits page more complete
by helping out in one of the following ways:

- [Edit the data file directly](https://github.com/JavaScriptBangkok/JavaScriptBangkok-1.0.0/edit/staff/website2/staff/README.md?pr=%2FJavaScriptBangkok%2FJavaScriptBangkok-1.0.0%2Fpull%2F47)
- Suggest a change by [commenting on the pull request](https://github.com/JavaScriptBangkok/JavaScriptBangkok-1.0.0/pull/47) or [message me on Facebook](https://m.me/dtinth).

Thanks, —Thai

</div>

<div style="text-align: center">

# JavaScript Bangkok 1.0.0 Staff List

<section v-for="section of $page.frontmatter.staffRoll">
  <h2>{{ section.title }}</h2>
  <div v-for="name of section.list || []">
    <PersonName :name="name" :people="$page.frontmatter.people" />
  </div>
  <table v-if="section.roles" style="margin: 0 auto">
    <tbody>
      <tr v-for="role of section.roles">
        <td style="text-align: right; padding-right: 1ex; vertical-align: top;">
          <span style="opacity: 0.75">{{role.role}}</span>
        </td>
        <td style="text-align: left">
          <div v-for="name of role.list || []">
            <PersonName :name="name" :people="$page.frontmatter.people" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</section>

</div>

<script>
import PersonName from '../.vuepress/local-components/PersonName.vue'

export default {
  components: {
    PersonName
  }
}
</script>
