import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useEffect, useRef, useState, createRef } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

// 定义数据类型
interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface Category {
  id: number
  name: string
  products: Product[]
}

// 假数据
const mockCategories: Category[] = [
  {
    id: 1,
    name: '手机数码',
    products: [
      { id: 101, name: '华为 Mate 60 Pro', price: 6999, image: 'https://via.placeholder.com/160' },
      { id: 102, name: 'iPhone 15 Pro Max', price: 9999, image: 'https://via.placeholder.com/160' },
      { id: 103, name: '小米 14 Ultra', price: 5999, image: 'https://via.placeholder.com/160' },
      { id: 104, name: 'OPPO Find X7', price: 4999, image: 'https://via.placeholder.com/160' },
      { id: 105, name: 'vivo X100 Pro', price: 5699, image: 'https://via.placeholder.com/160' },
      { id: 106, name: '三星 Galaxy S24 Ultra', price: 8999, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 2,
    name: '电脑办公',
    products: [
      { id: 201, name: 'MacBook Pro 16英寸', price: 18999, image: 'https://via.placeholder.com/160' },
      { id: 202, name: '联想小新 Pro 16', price: 6299, image: 'https://via.placeholder.com/160' },
      { id: 203, name: '华为 MateBook X Pro', price: 9999, image: 'https://via.placeholder.com/160' },
      { id: 204, name: '戴尔 XPS 15', price: 12999, image: 'https://via.placeholder.com/160' },
      { id: 205, name: '惠普 星 14', price: 5499, image: 'https://via.placeholder.com/160' },
      { id: 206, name: '机械键盘', price: 299, image: 'https://via.placeholder.com/160' },
      { id: 207, name: '罗技鼠标', price: 199, image: 'https://via.placeholder.com/160' },
      { id: 208, name: '显示器', price: 1299, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 3,
    name: '家用电器',
    products: [
      { id: 301, name: '海尔冰箱', price: 3999, image: 'https://via.placeholder.com/160' },
      { id: 302, name: '美的洗衣机', price: 2599, image: 'https://via.placeholder.com/160' },
      { id: 303, name: '格力空调', price: 3499, image: 'https://via.placeholder.com/160' },
      { id: 304, name: '小米电视', price: 2999, image: 'https://via.placeholder.com/160' },
      { id: 305, name: '九阳豆浆机', price: 299, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 4,
    name: '食品生鲜',
    products: [
      { id: 401, name: '有机蔬菜', price: 29.9, image: 'https://via.placeholder.com/160' },
      { id: 402, name: '进口水果', price: 59.9, image: 'https://via.placeholder.com/160' },
      { id: 403, name: '海鲜水产', price: 99.9, image: 'https://via.placeholder.com/160' },
      { id: 404, name: '肉禽蛋品', price: 49.9, image: 'https://via.placeholder.com/160' },
      { id: 405, name: '休闲零食', price: 19.9, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 5,
    name: '美妆护肤',
    products: [
      { id: 501, name: '面部精华', price: 299, image: 'https://via.placeholder.com/160' },
      { id: 502, name: '洁面乳', price: 99, image: 'https://via.placeholder.com/160' },
      { id: 503, name: '防晒霜', price: 159, image: 'https://via.placeholder.com/160' },
      { id: 504, name: '口红', price: 199, image: 'https://via.placeholder.com/160' },
      { id: 505, name: '眼影盘', price: 259, image: 'https://via.placeholder.com/160' },
      { id: 506, name: '香水', price: 499, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 6,
    name: '母婴童装',
    products: [
      { id: 601, name: '婴儿奶粉', price: 299, image: 'https://via.placeholder.com/160' },
      { id: 602, name: '纸尿裤', price: 199, image: 'https://via.placeholder.com/160' },
      { id: 603, name: '儿童玩具', price: 99, image: 'https://via.placeholder.com/160' },
      { id: 604, name: '童装', price: 159, image: 'https://via.placeholder.com/160' },
      { id: 605, name: '儿童书包', price: 129, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 7,
    name: '运动户外',
    products: [
      { id: 701, name: '跑步鞋', price: 599, image: 'https://via.placeholder.com/160' },
      { id: 702, name: '瑜伽垫', price: 99, image: 'https://via.placeholder.com/160' },
      { id: 703, name: '健身器材', price: 899, image: 'https://via.placeholder.com/160' },
      { id: 704, name: '运动服装', price: 299, image: 'https://via.placeholder.com/160' },
      { id: 705, name: '户外帐篷', price: 499, image: 'https://via.placeholder.com/160' },
    ]
  },
  {
    id: 8,
    name: '家居家装',
    products: [
      { id: 801, name: '沙发', price: 2999, image: 'https://via.placeholder.com/160' },
      { id: 802, name: '床垫', price: 1999, image: 'https://via.placeholder.com/160' },
      { id: 803, name: '餐桌', price: 1599, image: 'https://via.placeholder.com/160' },
      { id: 804, name: '衣柜', price: 2599, image: 'https://via.placeholder.com/160' },
      { id: 805, name: '茶几', price: 899, image: 'https://via.placeholder.com/160' },
      { id: 806, name: '灯具', price: 399, image: 'https://via.placeholder.com/160' },
    ]
  }
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<number>(1)
  const [categoryTops, setCategoryTops] = useState<{[key: number]: number}>({})
  // 使用createRef而不是useRef，因为Taro的ScrollView需要特殊处理
  const productListRef = createRef<any>()
  const categoryListRef = createRef<any>()
  const [scrolling, setScrolling] = useState<boolean>(false)

  useLoad(() => {
    console.log('Products page loaded.')
  })

  // 初始化每个分类的顶部位置
  useEffect(() => {
    const query = Taro.createSelectorQuery()

    mockCategories.forEach(category => {
      query.select(`#category-${category.id}`).boundingClientRect()
    })

    query.exec((res) => {
      if (!res || !res.length) return

      const tops: {[key: number]: number} = {}
      res.forEach((item, index) => {
        if (item) {
          tops[mockCategories[index].id] = item.top
        }
      })

      setCategoryTops(tops)
    })
  }, [])

  // 点击左侧分类，右侧滚动到对应位置
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId)
    setScrolling(true)

    // 获取所有分类元素的位置信息
    Taro.createSelectorQuery()
      .selectAll('.category-section')
      .boundingClientRect()
      .select('#product-list')
      .scrollOffset()
      .exec((res) => {
        if (!res || !res[0] || !res[1]) {
          setScrolling(false)
          return
        }

        const sections = res[0]
        const scrollOffset = res[1].scrollTop

        // 找到目标分类的索引
        const index = mockCategories.findIndex(c => c.id === categoryId)
        if (index === -1 || !sections[index]) {
          setScrolling(false)
          return
        }

        // 获取目标分类元素的位置
        const targetSection = sections[index]
        const targetTop = targetSection.top + scrollOffset - 10 // 减去一点偏移量，使标题完全可见

        // 使用Taro的方式滚动到对应元素
        Taro.createSelectorQuery()
          .select('#product-list')
          .node()
          .exec((nodeRes) => {
            const scrollView = nodeRes[0]?.node
            if (scrollView && scrollView.scrollTo) {
              // 直接滚动到目标分类的精确位置
              scrollView.scrollTo({ top: targetTop, animated: true })
            } else {
              // 如果无法直接操作节点，尝试使用pageScrollTo
              try {
                // 使用选择器滚动到对应元素
                Taro.pageScrollTo({
                  selector: `#category-${categoryId}`,
                  duration: 300,
                  offsetTop: 0
                })
              } catch (err) {
                console.error('Failed to scroll product list:', err)
              }
            }

            // 滚动完成后重置scrolling状态
            setTimeout(() => {
              setScrolling(false)
            }, 300)
          })
      })
  }

  // 右侧滚动时，左侧对应高亮
  const handleProductListScroll = (e) => {
    if (scrolling) return // 如果是通过点击分类触发的滚动，不处理

    const scrollTop = e.detail.scrollTop
    const scrollHeight = e.detail.scrollHeight
    const clientHeight = e.target.clientHeight

    // 检查是否滚动到底部
    const isBottom = scrollTop + clientHeight >= scrollHeight - 20 // 接近底部的阈值

    // 找出当前滚动位置对应的分类
    let currentCategory = mockCategories[0].id

    Taro.createSelectorQuery()
      .selectAll('.category-section')
      .boundingClientRect()
      .exec((res) => {
        if (!res || !res[0]) return

        const sections = res[0]

        // 如果滚动到底部，直接选择最后一个分类
        if (isBottom) {
          currentCategory = mockCategories[mockCategories.length - 1].id
        } else {
          // 否则根据可见区域确定当前分类
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i]
            if (section.top <= 100) { // 100是一个阈值，可以根据实际情况调整
              currentCategory = mockCategories[i].id
            } else {
              break
            }
          }
        }

        if (currentCategory !== activeCategory) {
          setActiveCategory(currentCategory)

          // 左侧列表滚动到当前分类
          const index = mockCategories.findIndex(c => c.id === currentCategory)
          if (index > -1) {
            // 使用更简单的方式滚动到对应分类
            // 计算每个分类项的高度（假设每个分类项高度相同）
            const itemHeight = 60 // 根据实际CSS调整这个值
            const targetScrollTop = index * itemHeight

            // 使用Taro的方式滚动
            Taro.createSelectorQuery()
              .select('.category-list')
              .node()
              .exec((res) => {
                const scrollView = res[0]?.node
                if (scrollView && scrollView.scrollTo) {
                  scrollView.scrollTo({ top: targetScrollTop, animated: true })
                } else {
                  // 如果无法直接操作节点，尝试使用pageScrollTo
                  try {
                    // 注意：这个方法可能在H5环境下不能正确滚动到分类列表
                    // 因为它通常滚动整个页面而不是特定元素
                    Taro.pageScrollTo({
                      scrollTop: targetScrollTop,
                      duration: 300,
                      selector: '.category-list'
                    })
                  } catch (err) {
                    console.error('Failed to scroll category list:', err)
                  }
                }
              })
          }
        }
      })
  }

  // 格式化价格显示
  const formatPrice = (price: number) => {
    return `¥${price.toFixed(2)}`
  }

  return (
    <View className='products-container'>
      {/* 左侧分类列表 */}
      <ScrollView
        className='category-list'
        scrollY
        scrollWithAnimation
        ref={categoryListRef}
      >
        {mockCategories.map(category => (
          <View
            key={category.id}
            className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </View>
        ))}
      </ScrollView>

      {/* 右侧商品列表 */}
      <ScrollView
        id='product-list'
        className='product-list'
        scrollY
        scrollWithAnimation
        onScroll={handleProductListScroll}
        ref={productListRef}
      >
        {mockCategories.map(category => (
          <View
            key={category.id}
            id={`category-${category.id}`}
            className='category-section'
          >
            <View className='category-title'>{category.name}</View>
            <View className='product-grid'>
              {category.products.map(product => (
                <View key={product.id} className='product-item'>
                  <Image className='product-image' src={product.image} mode='aspectFill' />
                  <Text className='product-name'>{product.name}</Text>
                  <Text className='product-price'>{formatPrice(product.price)}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
