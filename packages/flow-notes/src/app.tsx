import { onCreated, Component, defineView } from '@shrio/shrio'
import { Body } from './pages/body'
export const Welcome = defineView((props: {}, children, ctx) => {
  onCreated(() => {
    console.log('Welcome created!')
  })
  return (
    <>
      <div class="">
        <Component is={Body}></Component>
      </div>
    </>
  )
})
