import React, { useRef, useEffect, useState, type ElementType, type CSSProperties, type ReactNode } from 'react';

interface AnimateOnInViewProps {
  children: ReactNode | ((props: { isVisible: boolean }) => ReactNode);
  className: string; // 付与するアニメーションクラス
  triggerOnce?: boolean; // 一度だけ発火するか
  as?: ElementType; // ラップするタグ名
  style?: CSSProperties;
}

const AnimateOnInView: React.FC<AnimateOnInViewProps> = ({
  children,
  className,
  triggerOnce = true,
  as: Tag = 'div',
  style,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [triggerOnce]);

  const content = typeof children === 'function'
    ? (children as (props: { isVisible: boolean }) => ReactNode)({ isVisible })
    : children;

  return (
    <Tag
      ref={ref}
      className={isVisible ? className : ''}
      style={style}
    >
      {content}
    </Tag>
  );
};

export default AnimateOnInView; 