import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CTA from './../app/components/cta.vue'

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

const UButtonMock = {
  name: 'UButton',
  props: ['color', 'variant', 'trailingIcon'],
  template: '<button @click="$emit(\'click\')"><slot /></button>',
}

describe('CTA.vue', () => {
  const props = {
    title: 'Test CTA Title',
    description: 'Test CTA Description',
  }

  /**
   * Test 1: Memastikan title dan description muncul
   */
  it('renders title and description', () => {
    const wrapper = mount(CTA, {
      props,
      global: { components: { UButton: UButtonMock } },
    })

    expect(wrapper.text()).toContain(props.title)
    expect(wrapper.text()).toContain(props.description)
  })

  /**
   * Test 2: Memastikan dua tombol muncul dan memiliki label yang benar
   */
  it('renders two buttons with correct labels', () => {
    const wrapper = mount(CTA, {
      props,
      global: { components: { UButton: UButtonMock } },
    })

    const buttons = wrapper.findAllComponents(UButtonMock)
    expect(buttons.length).toBe(2)
    expect(buttons[0].text()).toBe('Daftarkan Sekarang')
    expect(buttons[1].text()).toBe('Hubungi Kami')
  })

  /**
   * Test 3: Memastikan klik tombol memanggil router.push dengan path yang sesuai
   */
  it('clicking buttons calls router.push with correct path', async () => {
    const wrapper = mount(CTA, {
      props,
      global: { components: { UButton: UButtonMock } },
    })

    const buttons = wrapper.findAllComponents(UButtonMock)
    await buttons[0].trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/ppdb')

    await buttons[1].trigger('click')
    expect(pushMock).toHaveBeenCalledWith('/contact')
  })
})
