"use client";

import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IframeCardProps {
  src: string;
  title?: string;
  description?: string;
  scale?: number;
  height?: string;
  width?: string;
}

export function IframeCard({
  src,
  title,
  description,
  scale = 0.8,
  height = "500px",
  width: _width = "100%",
}: IframeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openExternal = () => {
    window.open(src, "_blank");
  };

  // スケールに基づいて逆数を計算 (0.8 -> 125%)
  const inverseScale = isExpanded ? 1 : (1 / scale) * 100;

  return (
    <Card className="my-6 overflow-hidden border shadow-md">
      {title && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleExpand}
                title={isExpanded ? "縮小表示" : "拡大表示"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={openExternal}
                title="新しいウィンドウで開く"
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div
          style={{
            height: isExpanded ? "calc(100vh - 200px)" : height,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              transform: isExpanded ? "none" : `scale(${scale})`,
              transformOrigin: "top left",
              width: "100%",
              height: "100%",
            }}
          >
            <iframe
              src={src}
              title={title || "埋め込みコンテンツ"}
              style={{
                width: isExpanded ? "100%" : `${inverseScale}%`,
                height: isExpanded ? "100%" : `${inverseScale}%`,
                border: "none",
              }}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
