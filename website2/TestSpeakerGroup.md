---
homepage: true
speakers:
  - title: A love story written in JavaScript
    name: Ramón Guijarro
    image: /speaker-images/01.jpg
    description: |
      Dating apps can feel tedious and like a waste of time.
      Is there a way to skip the grunt work?
      That’s what I asked myself six months ago when I built Swipr, a tool written in JavaScript that does the swiping for you.
      In this talk we’ll see how it works and how to built CLIs with Node along the way.
  - title: Optimization design patterns - from games to web
    name: Yonatan Kra
    description: |
      Gamers expect a flawless real-like experience. So do your applications users. Utilizing techniques that are heavily used in games, can help you boost your app’s performance and also save you money in cloud expanses. We’ll see how you can save on CPU, memory and bandwidth with these techniques.
  - title: "Just go for it: The story of dance-mat.js"
    name: Ramón Huidobro
    description: |
      Side projects can be daunting. It takes discipline to get started, and even more so to finish.
      In this talk, I’ll introduce dance-mat.js, the project for making a Dance Dance Revolution controller with a yoga mat, a Raspberry Pi, conductive paint, and Node.js.
  - title: The Art of Crafting Codemods
    name: Rajasegar Chandran
    description: |
      Codemod is a mechanism to make sweeping changes across your code with ease and effectiveness, assisting in large-scale migrations of the code-base. This can be performed through automated tools such as jscodeshift.
  - title: A journey of building large-scale reusable web components
    name: Varayut Lerdkanlayanawat
    description: |
      Have you ever wondered what the process of building reusable web components that are used by 200+ developer teams looks like? In this talk, you will be walked through all aspects that need to be considered while designing and implementing reusable web components along with fun real-world examples.
  - title: Applying SOLID principle in JavaScript without Class and Object
    name: Chakrit Likitkhajorn
    description: |
      The SOLID principle is well-known in our industry. However, most of the articles, books, and examples are based on traditional Object-oriented language constructs.

      This talk will show how can we apply these principles in Javascript where classes are not necessary nor encouraged.
  - title: "Talking about “Scale”: Takeaways from our attempt on scaling a small system in the Gojek Universe"
    name: Tino Thamjarat
    description: |
      The year is 2019 and every engineer must have been asked once to build a “scalable” system. I will be telling the story of our team journey in building a financial system that serves 20X traffic in less than a year. Engineering practices, wrong (and right!) decisions, process improvement and more!
  - title: What happens when you cancel an HTTP request?
    name: Younes Jaaidi
    description: |
      Reactive libraries like RxJS allow us to easily cancel HTTP requests but is that really efficient? What really happens on the back-end? Is it possible to propagate the cancelation from the front-end through our microservices and cancel the database query?
  - title: Adventures with the Event Loop
    name: Erin Zimmer
    description: |
      The event loop completely underpins everything that happens in the browser. Yet many developers know very little about it. This talk will help them better understand the nitty-gritty of what’s really going on when you create a Promise, add an event listener, or request an animation frame.
  - title: End-to-end Type-Safe GraphQL Apps
    name: Carlos Rufo
    description: |
      Discover all the benefits of using GraphQL adding End-to-end Type-Safety to your app with this live-coding talk. At the end of such, you’ll want to refactor your codebase in order to take all the advantages of TypeScript, GraphQL & React working together on a SpaceX demo 🚀
  - title: Building your first malicious chrome extension 😈
    name: Alon Kiriati
    description: |
      In this talk I will explain the basics of building your first chrome extension, in just a couple of minutes! It takes few more lines to turn it into a malicious one. The main purpose here is not to turn you into a hacker, but to increase awareness to these “small” and “harmless” plugins.
  - title: DevTools, the CSS advocate in your browser
    name: Chen Hui Jing
    description: |
      New CSS features, like Flexbox, Grid or Shapes, introduce new properties that can sometimes be complicated to people who are encountering them for the first time. This talk will introduce DevTools features that can help us understand what’s going on, and make it less intimidating to try out new CSS.
  - title: "Poor Man's Patcher: A game modder's adventure through serverless sea without money"
    name: Atthaporn Thanongkiatisak
    description: |
      Before the words “DevOps” and “Serverless” even become well-known, I, as a hobbyist Game Modder, was trying to achieve these 2 things using JavaScript and a lot of free services for my mod distribution patcher app. In this talk, I’ll walk you through how I did it and what’s my thinking behind.
---

<SpeakerGroup :groupName="'Test'">
  <SpeakerList
    slot="content"
    :speakers="$page.frontmatter.speakers"
  ></SpeakerList>
</SpeakerGroup>

<script>
import SpeakerGroup from './.vuepress/local-components/SpeakerGroup.vue'
import SpeakerList from './.vuepress/local-components/SpeakerList.vue'

export default {
  components: {
    SpeakerGroup,
    SpeakerList
  }
}
</script>
