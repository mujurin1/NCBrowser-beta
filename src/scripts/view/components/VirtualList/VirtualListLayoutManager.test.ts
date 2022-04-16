import { VirtualListLayoutManager } from "./VirtualListLayoutManager";

describe("VirtualListLayoutManager", () => {
  it("初期化", () => {
    const layoutManager = new VirtualListLayoutManager(30, 5);

    expect(layoutManager.listViewLayout).toEqual({
      scrollHeight: 150,
      visibleRowCount: 0,
      rowLayouts: [],
    });
    expect(layoutManager.scrollTop).toBe(0);
  });

  describe("setViewportHeight", () => {
    it("最下端までスクロールしていない状態で、ビューポートを小さくした場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(60);
      layoutManager.setScrollPosition(10);

      layoutManager.setViewportHeight(40);

      expect(layoutManager.scrollTop).toEqual(30);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 2,
        rowLayouts: [
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: 30 } },
          },
          {
            key: "0",
            itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
          },
        ],
      });
    });

    it("コンテンツよりビューポートが小さい状態で、コンテンツより大きなサイズへリサイズした場合", () => {
      // スクロール位置が0になるべき
      const layoutManager = new VirtualListLayoutManager(30, 2);
      layoutManager.setViewportHeight(100);

      expect(layoutManager.scrollTop).toEqual(0);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 60,
        visibleRowCount: 2,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
          },
        ],
      });
    });

    it("コンテンツよりビューポートが大きい状態で、コンテンツより大きなサイズへリサイズした場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 2);
      layoutManager.setViewportHeight(200);
      layoutManager.setScrollPosition(0);

      layoutManager.setViewportHeight(100);
      expect(layoutManager.scrollTop).toEqual(0);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 60,
        visibleRowCount: 2,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
          },
        ],
      });
    });

    it("コンテンツよりビューポートが大きい状態で、コンテンツより小さなサイズへリサイズした場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 2);
      layoutManager.setViewportHeight(200);
      layoutManager.setScrollPosition(0);

      layoutManager.setViewportHeight(50);
      expect(layoutManager.scrollTop).toEqual(10);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 60,
        visibleRowCount: 2,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: -10 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 20 } },
          },
        ],
      });
    });

    it("最下端までスクロールしている状態で、ビューポートを小さくした場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(100);
      layoutManager.setScrollPosition(50);

      layoutManager.setViewportHeight(80);

      expect(layoutManager.scrollTop).toEqual(70);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 3,
        rowLayouts: [
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: -10 } },
          },
          {
            key: "3",
            itemLayout: { index: 3, style: { minHeight: 30, top: 20 } },
          },
          {
            key: "0",
            itemLayout: { index: 4, style: { minHeight: 30, top: 50 } },
          },
          {
            key: "1",
            itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
          },
        ],
      });
    });

    it("最下端までスクロールしている状態で、ビューポートを大きくした場合", () => {
      // スクロール位置が最下端になるべき

      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(100);
      layoutManager.setScrollPosition(50);

      layoutManager.setViewportHeight(120);

      expect(layoutManager.scrollTop).toEqual(30);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 4,
        rowLayouts: [
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: 30 } },
          },
          {
            key: "3",
            itemLayout: { index: 3, style: { minHeight: 30, top: 60 } },
          },
          {
            key: "0",
            itemLayout: { index: 4, style: { minHeight: 30, top: 90 } },
          },
        ],
      });
    });

    it("最下端までスクロールしている状態で、ビューポートをコンテンツより大きくした場合", () => {
      // スクロール位置が0になるべき
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(100);
      layoutManager.setScrollPosition(50);

      layoutManager.setViewportHeight(200);

      expect(layoutManager.scrollTop).toEqual(0);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 5,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
          },
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: 60 } },
          },
          {
            key: "3",
            itemLayout: { index: 3, style: { minHeight: 30, top: 90 } },
          },
          {
            key: "4",
            itemLayout: { index: 4, style: { minHeight: 30, top: 120 } },
          },
        ],
      });
    });
  });

  describe("setScrollPosition", () => {
    it("通常のケース", () => {
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(60);
      layoutManager.setScrollPosition(10);

      expect(layoutManager.scrollTop).toBe(10);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 3,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: -10 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 20 } },
          },
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: 50 } },
          },
        ],
      });
    });

    it("値域より小さい値を指定した場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(60);
      layoutManager.setScrollPosition(-100);

      expect(layoutManager.scrollTop).toBe(0);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 3,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "1",
            itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
          },
          {
            key: "2",
            itemLayout: { index: 2, style: { minHeight: 30, top: 60 } },
          },
        ],
      });
    });

    it("値域より大きい値を指定した場合", () => {
      const layoutManager = new VirtualListLayoutManager(30, 5);
      layoutManager.setViewportHeight(60);
      layoutManager.setScrollPosition(1000);

      expect(layoutManager.scrollTop).toBe(90);
      expect(layoutManager.listViewLayout).toEqual({
        scrollHeight: 150,
        visibleRowCount: 2,
        rowLayouts: [
          {
            key: "0",
            itemLayout: { index: 3, style: { minHeight: 30, top: 0 } },
          },
          {
            key: "1",
            itemLayout: { index: 4, style: { minHeight: 30, top: 30 } },
          },
          {
            key: "2",
            itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
          },
        ],
      });
    });
  });

  describe("setRowCount", () => {
    describe("heightsを指定しない場合", () => {
      it("行数を減らした場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(10);

        layoutManager.setRowCount(4);

        expect(layoutManager.scrollTop).toBe(10);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 120,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: -10 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 20 } },
            },
            {
              key: "2",
              itemLayout: { index: 2, style: { minHeight: 30, top: 50 } },
            },
            {
              key: "3",
              itemLayout: { index: 3, style: { minHeight: 30, top: 80 } },
            },
          ],
        });
      });

      it("最下端までスクロールしている状態で、行数を減らした場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(50);

        layoutManager.setRowCount(4);

        expect(layoutManager.scrollTop).toBe(20);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 120,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: -20 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 10 } },
            },
            {
              key: "2",
              itemLayout: { index: 2, style: { minHeight: 30, top: 40 } },
            },
            {
              key: "3",
              itemLayout: { index: 3, style: { minHeight: 30, top: 70 } },
            },
          ],
        });
      });

      it("行数を減らした結果、スクロール位置が値域外となる場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(40);

        layoutManager.setRowCount(4);

        expect(layoutManager.scrollTop).toBe(20);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 120,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: -20 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 10 } },
            },
            {
              key: "2",
              itemLayout: { index: 2, style: { minHeight: 30, top: 40 } },
            },
            {
              key: "3",
              itemLayout: { index: 3, style: { minHeight: 30, top: 70 } },
            },
          ],
        });
      });

      it("行数を減らした結果、コンテンツサイズがビューポートサイズより小さくなる場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(10);

        layoutManager.setRowCount(1);

        expect(layoutManager.scrollTop).toBe(0);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 30,
          visibleRowCount: 1,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
            },
            {
              key: "1",
              itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
            },
            {
              key: "2",
              itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
            },
            {
              key: "3",
              itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
            },
          ],
        });
      });

      it("最下端までスクロールしている状態で、行数を減らした結果、コンテンツサイズがビューポートサイズより小さくなる場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(50);

        layoutManager.setRowCount(2);

        expect(layoutManager.scrollTop).toBe(0);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 60,
          visibleRowCount: 2,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
            },
            {
              key: "2",
              itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
            },
            {
              key: "3",
              itemLayout: { index: -1, style: { minHeight: 0, top: 0 } },
            },
          ],
        });
      });

      it("行数を増やした場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(10);

        layoutManager.setRowCount(10);

        expect(layoutManager.scrollTop).toBe(10);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 300,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: -10 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 20 } },
            },
            {
              key: "2",
              itemLayout: { index: 2, style: { minHeight: 30, top: 50 } },
            },
            {
              key: "3",
              itemLayout: { index: 3, style: { minHeight: 30, top: 80 } },
            },
          ],
        });
      });

      it("最下端までスクロールしている状態で、行数を増やした場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 5);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(50);

        layoutManager.setRowCount(10);

        expect(layoutManager.scrollTop).toBe(200);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 300,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "2",
              itemLayout: { index: 6, style: { minHeight: 30, top: -20 } },
            },
            {
              key: "3",
              itemLayout: { index: 7, style: { minHeight: 30, top: 10 } },
            },
            {
              key: "0",
              itemLayout: { index: 8, style: { minHeight: 30, top: 40 } },
            },
            {
              key: "1",
              itemLayout: { index: 9, style: { minHeight: 30, top: 70 } },
            },
          ],
        });
      });

      it("行数を増やした結果、コンテンツサイズがビューポートサイズより大きくなる場合", () => {
        const layoutManager = new VirtualListLayoutManager(30, 2);
        layoutManager.setViewportHeight(100);
        layoutManager.setScrollPosition(0);

        layoutManager.setRowCount(5);

        expect(layoutManager.scrollTop).toBe(0);
        expect(layoutManager.listViewLayout).toEqual({
          scrollHeight: 150,
          visibleRowCount: 4,
          rowLayouts: [
            {
              key: "0",
              itemLayout: { index: 0, style: { minHeight: 30, top: 0 } },
            },
            {
              key: "1",
              itemLayout: { index: 1, style: { minHeight: 30, top: 30 } },
            },
            {
              key: "2",
              itemLayout: { index: 2, style: { minHeight: 30, top: 60 } },
            },
            {
              key: "3",
              itemLayout: { index: 3, style: { minHeight: 30, top: 90 } },
            },
          ],
        });
      });
    });
  });
});
