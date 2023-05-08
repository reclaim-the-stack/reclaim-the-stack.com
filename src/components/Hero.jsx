import { Button } from '@/components/Button'

function HeroParagraph({children}) {
  return <p className="mb-6 mx-auto max-w-[55rem]">{children}</p>
}

export function Hero() {
  return (
    <div className="text-center w-full text-2xl text-stone-700 dark:text-stone-200">
      <img className="mx-auto mt-10 mb-16 w-[250px]" src="/reclaim-the-stack.png" alt="Reclaim the Stack" width="250" />
      <HeroParagraph>We spent 7 months building a Kubernetes based platform to replace Heroku for our SaaS product at <a href="https://www.mynewsdesk.com">mynewsdesk.com</a>. <strong className="dark:text-stone-100">The results were a 90% reduction in costs and a 30% improvement in performance.</strong> We also significantly improved developer experience with reduced deploy times and faster / more accessible tooling.</HeroParagraph>

      <HeroParagraph>We have now open sourced the entire stack, so you can do the same, but in a few days instead of 7 months. <strong className="dark:text-stone-100">It's time to Reclaim the Stack!</strong></HeroParagraph>

      <Button className="mt-10 mr-5 text-lg" href="/kubernetes-platform">Read the Documentation</Button>
      <Button className="text-lg" variant="text" href="https://discord.gg/v23eA4FMPC">Join the Discord Server</Button>
    </div>
  )
}