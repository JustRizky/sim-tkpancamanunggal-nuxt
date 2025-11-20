import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Carousel from './../app/components/carousel.vue'

const UCarouselMock = {
  name: 'UCarousel',
  props: ['items', 'loop', 'arrows', 'dots', 'autoplay', 'ui'],
  template: '<div><slot v-for="item in items" :item="item">{{ item }}</slot></div>',
}

describe('Carousel.vue', () => {
  const items = ['/img1.jpg', '/img2.jpg', '/img3.jpg']

  /**
   * Test 1: Memastikan jumlah gambar yang dirender sama dengan jumlah item
   */
  it('renders correct number of images', () => {
    const wrapper = mount(Carousel, {
      props: { items },
      global: { components: { UCarousel: UCarouselMock } },
    })
    const imgs = wrapper.findAll('img')
    expect(imgs.length).toBe(items.length)
  })

  /**
   * Test 2: Memastikan tiap gambar memiliki src yang sesuai
   */
  it('renders images with correct src', () => {
    const wrapper = mount(Carousel, {
      props: { items },
      global: { components: { UCarousel: UCarouselMock } },
    })
    const imgs = wrapper.findAll('img')
    imgs.forEach((img, index) => {
      expect(img.attributes('src')).toBe(items[index])
    })
  })

  /**
   * Test 3: Memastikan komponen carousel container muncul
   */
  it('renders carousel container', () => {
    const wrapper = mount(Carousel, {
      props: { items },
      global: { components: { UCarousel: UCarouselMock } },
    })
    expect(wrapper.findComponent({ name: 'UCarousel' }).exists()).toBe(true)
  })
})
