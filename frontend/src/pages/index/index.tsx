import { View, Text, Button } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const navigateToProducts = () => {
    Taro.navigateTo({
      url: '/pages/products/index'
    })
  }

  return (
    <View className='index'>
      <Text>淘淘团商城</Text>
      <Button type='primary' onClick={navigateToProducts} style={{ marginTop: '20px' }}>
        浏览商品分类
      </Button>
    </View>
  )
}
