import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from '../../app/components/card.vue'

describe('Card.vue', () => {
  const props = {
    title: 'Test Card',
    description: 'This is a test description',
    image: '/test-image.jpg',
  }

  /**
   * Test 1: Memastikan title dan description ditampilkan
   */
  it('renders title and description', () => {
    const wrapper = mount(Card, { props })
    expect(wrapper.text()).toContain(props.title)
    expect(wrapper.text()).toContain(props.description)
  })

  /**
   * Test 2: Memastikan image muncul dengan src dan alt yang benar
   */
  it('renders image with correct src and alt', () => {
    const wrapper = mount(Card, { props })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(props.image)
    expect(img.attributes('alt')).toBe(props.title)
  })

  /**
   * Test 3: Snapshot testing
   * Untuk ngecek apakah markup HTML komponen tidak berubah secara tidak sengaja
   */
  it('matches snapshot', () => {
    const wrapper = mount(Card, { props })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
