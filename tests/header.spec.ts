import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Header from './../app/components/header.vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/about',
  }),
}))

const UHeaderMock = {
  name: 'UHeader',
  props: ['title', 'ui'],
  template: '<header><slot /><slot name="right"/><slot name="body"/></header>',
}

const UNavigationMenuMock = {
  name: 'UNavigationMenu',
  props: ['items', 'orientation', 'ui', 'class', 'collapsed'],
  template: '<nav><ul><li v-for="item in items" :key="item.label">{{ item.label }} - {{ item.active }} - {{ item.iconClass }}</li></ul></nav>',
}

const LogoMock = { name: 'Logo', template: '<div class="logo-mock" />' }

describe('Header.vue', () => {
  /**
   * Test 1: Memastikan title header muncul dan logo ditampilkan
   */
  it('renders title and logo', () => {
    const wrapper = mount(Header, {
      global: { components: { UHeader: UHeaderMock, UNavigationMenu: UNavigationMenuMock, Logo: LogoMock } },
    })

    const header = wrapper.findComponent(UHeaderMock)
    expect(header.props('title')).toBe('TK Panca Manunggal')

    expect(wrapper.findComponent(LogoMock).exists()).toBe(true)
  })

  /**
   * Test 2: Memastikan navigasi atas tampil dengan jumlah item yang benar dan active class sesuai
   */
  it('renders top navigation menu with correct items and active class', () => {
    const wrapper = mount(Header, {
      global: { components: { UHeader: UHeaderMock, UNavigationMenu: UNavigationMenuMock, Logo: LogoMock } },
    })

    const topMenu = wrapper.find('ul:not([data-orientation="vertical"])')
    const navItems = topMenu.findAll('li')
    expect(navItems.length).toBe(4)
    expect(navItems[0].text()).toContain('Home')
    expect(navItems[1].text()).toContain('Tentang Kami')
    expect(navItems[2].text()).toContain('PPDB')
    expect(navItems[3].text()).toContain('Kontak Kami')

    expect(navItems[1].text()).toContain('primary')
    expect(navItems[0].text()).toContain('neutral')
  })

  /*
   * Test 3: Memastikan menu body (misal hamburger / mobile menu) menampilkan iconClass dengan benar
   */
  it('renders body navigation menu with correct iconClass', () => {
    const wrapper = mount(Header, {
      global: { components: { UHeader: UHeaderMock, UNavigationMenu: UNavigationMenuMock, Logo: LogoMock } },
    })

    const bodyNavItems = wrapper.findAll('li')
    const aboutItem = bodyNavItems.find((li) => li.text().includes('Tentang Kami'))
    expect(aboutItem?.text()).toContain('primary')

    const homeItem = bodyNavItems.find((li) => li.text().includes('Home'))
    expect(homeItem?.text()).toContain('neutral')
  })
})

