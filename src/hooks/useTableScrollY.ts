function useTableScrollY(offsetBottom = 0) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(400);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setScrollY(rect.height - offsetBottom);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [offsetBottom]);

  return { containerRef, scrollY };
}

export default useTableScrollY;
