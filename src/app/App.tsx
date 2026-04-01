/**
 * ReSparkX 主站落地页
 * 设计来源: https://www.figma.com/design/mPYmIc1AdYEQmvB3TwzYBB
 */

import { useState, useRef, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

// Chess 棋子：本地资源（pawn / queen）
const IMG_CHESS_PAWN = "/chess-pawn.png";
const IMG_CHESS_QUEEN = "/chess-queen.png";
/** 与 public/sunflower.png 一致（勿使用 Figma MCP / 外链，避免线上加载失败） */
const IMG_SUNFLOWER = "/sunflower.png";

const LONG_PRESS_MS = 500;

export default function App() {
  const [sunflowerActive, setSunflowerActive] = useState(false);
  const [chessActive, setChessActive] = useState(false);
  const sunflowerPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chessPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSunflowerTimer = useCallback(() => {
    if (sunflowerPressTimer.current) {
      clearTimeout(sunflowerPressTimer.current);
      sunflowerPressTimer.current = null;
    }
  }, []);

  const clearChessTimer = useCallback(() => {
    if (chessPressTimer.current) {
      clearTimeout(chessPressTimer.current);
      chessPressTimer.current = null;
    }
  }, []);

  return (
    <div
      className="relative min-h-screen flex justify-center"
      style={{
        backgroundColor: "var(--page-bg)",
        minWidth: "100%",
      }}
    >
      {/* 390×704 画布 — Figma 1:3，桌面端背景平铺 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(390px, 100vw)",
          minHeight: "max(704px, 100dvh)",
          backgroundColor: "var(--canvas-bg)",
        }}
      >
        {/* 图片置于文字上层：先渲染图片并设高 z-index */}
        {/* Chess 插图 — Figma 设计稿：128.89, 333.99, 225.819×225.819，内图 199.972，旋转 7.99° */}
        <a
          href="https://link.chess.com/play/53Rv7k"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute flex items-center justify-center cursor-pointer overflow-visible no-underline"
          style={{
            left: 128.89,
            top: 333.99,
            width: 225.819,
            height: 225.819,
            zIndex: 20,
          }}
          onMouseEnter={() => setChessActive(true)}
          onMouseLeave={() => setChessActive(false)}
          onTouchStart={() => {
            chessPressTimer.current = setTimeout(() => setChessActive(true), LONG_PRESS_MS);
          }}
          onTouchEnd={() => {
            clearChessTimer();
            setTimeout(() => setChessActive(false), 1500);
          }}
          onTouchCancel={clearChessTimer}
        >
          <div
            className="flex-none overflow-visible"
            style={{
              width: 199.972,
              height: 199.972,
              transform: chessActive ? "scale(1.2)" : "rotate(7.99deg)",
              transformOrigin: "center center",
            }}
          >
            <img
              alt="Chess"
              src={chessActive ? IMG_CHESS_QUEEN : IMG_CHESS_PAWN}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        </a>

        {/* Sunflower 插图 — Figma 设计稿：35, 171, 175×243，hover/长按 随风摆动 */}
        <a
          href="https://www.resparkx.com/readaloud/"
          className={`absolute cursor-pointer no-underline ${sunflowerActive ? "sunflower-sway" : ""}`}
          style={{
            left: 35,
            top: 171,
            width: 175,
            height: 243,
            zIndex: 20,
          }}
          onMouseEnter={() => setSunflowerActive(true)}
          onMouseLeave={() => setSunflowerActive(false)}
          onTouchStart={() => {
            sunflowerPressTimer.current = setTimeout(
              () => setSunflowerActive(true),
              LONG_PRESS_MS
            );
          }}
          onTouchEnd={() => {
            clearSunflowerTimer();
            setSunflowerActive(false);
          }}
          onTouchCancel={() => {
            clearSunflowerTimer();
            setSunflowerActive(false);
          }}
        >
          <img
            alt="Sunflower"
            src={IMG_SUNFLOWER}
            className="block w-full h-full object-cover pointer-events-none"
          />
        </a>

        {/* ReSparkX Logo — Figma 1:4 */}
        <p
          className="absolute whitespace-nowrap"
          style={{
            left: 60,
            top: 102,
            zIndex: 0,
            fontFamily: "'Metal', 'Playfair Display', serif",
            fontSize: 30,
            fontWeight: 100,
            color: "var(--text-color)",
            lineHeight: "normal",
            margin: 0,
          }}
        >
          ReSparkX
        </p>

        {/* Daily Read Aloud — Figma 设计稿：145, 286, 81×43 */}
        <a
          href="/readaloud"
          className="absolute no-underline transition-opacity hover:opacity-60"
          style={{
            left: 145,
            top: 286,
            zIndex: 0,
            width: 81,
            fontFamily: "'Metal', serif",
            fontSize: 18,
            fontWeight: 100,
            lineHeight: 1.2,
            color: "var(--text-muted)",
          }}
        >
          <p style={{ margin: 0 }}>Daily</p>
          <p style={{ margin: 0 }}>Read Aloud</p>
        </a>

        {/* Chess With Me — Figma 设计稿：258, 442, 87×43；hover 时变 CheckMate */}
        <div
          className="absolute"
          style={{
            left: 258,
            top: 442,
            zIndex: 0,
            width: 87,
            fontFamily: "'Metal', serif",
            fontSize: 18,
            fontWeight: 100,
            lineHeight: 1.2,
            color: "var(--text-muted)",
          }}
        >
          {chessActive ? (
            <p style={{ margin: 0 }}>CheckMate</p>
          ) : (
            <>
              <p style={{ margin: 0 }}>Chess</p>
              <p style={{ margin: 0 }}>With Me</p>
            </>
          )}
        </div>

        {/* Footer — Figma 设计稿：60, 647, 191×25, 12px */}
        <p
          className="absolute"
          style={{
            left: 60,
            top: 647,
            zIndex: 0,
            width: 191,
            fontFamily: "'Metal', serif",
            fontSize: 12,
            fontWeight: 100,
            lineHeight: "normal",
            color: "var(--text-footer)",
            margin: 0,
          }}
        >
          © 2026 ReSparkX by Xlll
        </p>
      </div>
      <Analytics />
    </div>
  );
}
