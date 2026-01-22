import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Footer from '../../app/components/footer.vue'

const UFooterMock = {
  name: 'UFooter',
  template: '<div><slot name="left"/><slot name="right"/><slot /></div>',
}

const UNavigationMenuMock = {
  name: 'UNavigationMenu',
  props: ['items', 'variant'],
  template: '<nav><ul><li v-for="item in items" :key="item.label">{{ item.label }}</li></ul></nav>',
}

const UButtonMock = {
  name: 'UButton',
  props: ['icon', 'color', 'variant', 'to', 'target', 'ariaLabel'],
  template: '<button><slot /></button>',
}

describe('Footer.vue', () => {
  /**
   * Test 1: Memastikan copyright muncul dengan tahun berjalan
   */
  it('renders copyright text', () => {
    const wrapper = mount(Footer, {
      global: {
        components: {
          UFooter: UFooterMock,
          UNavigationMenu: UNavigationMenuMock,
          UButton: UButtonMock,
        },
      },
    })

    const year = new Date().getFullYear()
    expect(wrapper.text()).toContain(`Copyright © ${year} | TK Panca Manunggal`)
  })

  /**
   * Test 2: Memastikan semua item navigasi muncul di footer
   */
  it('renders all navigation menu items', () => {
    const wrapper = mount(Footer, {
      global: {
        components: {
          UFooter: UFooterMock,
          UNavigationMenu: UNavigationMenuMock,
          UButton: UButtonMock,
        },
      },
    })

    const navItems = wrapper.findAll('li')
    expect(navItems.length).toBe(4)
    expect(navItems[0].text()).toBe('Home')
    expect(navItems[1].text()).toBe('Tentang Kami')
    expect(navItems[2].text()).toBe('PPDB')
    expect(navItems[3].text()).toBe('Kontak Kami')
  })

  /**
   * Test 3: Memastikan tombol media sosial (Instagram & YouTube) muncul dengan label yang benar
   */
  it('renders social media buttons', () => {
    const wrapper = mount(Footer, {
      global: {
        components: {
          UFooter: UFooterMock,
          UNavigationMenu: UNavigationMenuMock,
          UButton: UButtonMock,
        },
      },
    })

    const buttons = wrapper.findAllComponents(UButtonMock)
    expect(buttons.length).toBe(2)
    expect(buttons[0].props('ariaLabel')).toBe('Instagram')
    expect(buttons[1].props('ariaLabel')).toBe('YouTube')
  })
})
