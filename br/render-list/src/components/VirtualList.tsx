import { FixedSizeList as List } from 'react-window';
import {memo, useCallback, useState, useRef} from 'react';

interface Item {
  id: number;
  name: string;
  value: number;
  description: string;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Item[];
}

const Row = memo(({ index, style, data }: RowProps) => {
  const item = data[index];
  
  return (
    <div style={style} className="flex items-center p-4 border-b hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
      <div className="text-blue-600">
        {item.value}
      </div>
    </div>
  );
});

Row.displayName = 'Row';

interface VirtualListProps {
  items: Item[];
}

export default function VirtualList({ items }: VirtualListProps) {
  // 超过100行后显示回到顶部按钮
  const [showBackToTop, setShowBackToTop] = useState(false);
  // 创建引用，用于获取List实例
  const listRef = useRef<List>(null);
  // 不需要每次都重新计算
  const onScroll = useCallback(({ scrollOffset }: { scrollOffset: number }) => {
    setShowBackToTop(scrollOffset > 8000); // 100行 * 80px(itemSize) = 8000px
  }, []);
  // 回到顶部
  const scrollToTop = useCallback(() => {
    listRef.current?.scrollTo(0);
  }, []);
  return (
    <div className="relative">
      <List
        ref={listRef}
        height={600}
        itemCount={items.length}
        itemSize={80}
        width="100%"
        itemData={items}
        onScroll={onScroll}
      >
        {Row}
      </List>
      
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          style={{ zIndex: 1000 }}
        >
          {/* 向上箭头 */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" // 继承父元素的颜色
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}