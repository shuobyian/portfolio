export function AdminAlsDeploymentDiagram() {
  return (
    <svg
      viewBox="0 0 820 520"
      className="h-auto w-full text-foreground"
      role="img"
      aria-label="admin-als 배포 흐름 다이어그램 — build → dist 복사 → PV 저장 → Kubernetes Nginx Pod 서빙"
    >
      <defs>
        <marker
          id="admin-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* GitOps 설정 노트 (우상단) */}
      <g className="text-foreground">
        <rect
          x="500"
          y="20"
          width="300"
          height="104"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="520"
        y="48"
        className="fill-foreground"
        fontSize="13"
        fontWeight="600"
      >
        설정 Repository
      </text>
      <text
        x="520"
        y="68"
        className="fill-muted-foreground"
        fontSize="12"
        fontFamily="monospace"
      >
        alssolution/gitops-als
      </text>
      <text
        x="520"
        y="92"
        className="fill-foreground"
        fontSize="13"
        fontWeight="600"
      >
        파일 위치
      </text>
      <text
        x="520"
        y="112"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        scm-admin/admin.yaml · deployment.yaml
      </text>

      {/* Kubernetes 경계 */}
      <g className="text-muted-foreground">
        <rect
          x="470"
          y="170"
          width="330"
          height="300"
          rx="12"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
      </g>
      <text
        x="635"
        y="196"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="13"
        fontWeight="600"
      >
        Kubernetes
      </text>

      {/* 좌측 빌드 파이프라인 */}
      {[
        { y: 40, h: 58, l1: "admin-als build", l2: "" },
        { y: 150, h: 58, l1: "dist 폴더 생성", l2: "" },
        { y: 265, h: 66, l1: "dist 폴더를", l2: "서버 폴더에 복사" },
        { y: 385, h: 72, l1: "dist", l2: "(frontend build 결과물)" },
      ].map((b) => (
        <g key={b.y}>
          <g className="text-accent">
            <rect
              x="40"
              y={b.y}
              width="190"
              height={b.h}
              rx="10"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
          <text
            x="135"
            y={b.l2 ? b.y + b.h / 2 - 4 : b.y + b.h / 2 + 5}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="14"
            fontWeight="600"
          >
            {b.l1}
          </text>
          {b.l2 && (
            <text
              x="135"
              y={b.y + b.h / 2 + 16}
              textAnchor="middle"
              className="fill-foreground"
              fontSize="13"
              fontWeight="600"
            >
              {b.l2}
            </text>
          )}
        </g>
      ))}

      {/* 파이프라인 세로 화살표 */}
      <g className="text-accent">
        <line
          x1="135"
          y1="98"
          x2="135"
          y2="148"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#admin-arrow)"
        />
        <line
          x1="135"
          y1="208"
          x2="135"
          y2="263"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#admin-arrow)"
        />
        <line
          x1="135"
          y1="331"
          x2="135"
          y2="383"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#admin-arrow)"
        />
      </g>

      {/* Pod (nginx) */}
      <g className="text-accent">
        <rect
          x="510"
          y="215"
          width="250"
          height="82"
          rx="10"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="635"
        y="250"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="600"
      >
        Pod (nginx)
      </text>
      <text
        x="635"
        y="273"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        호스트: admin.alssolution.co.kr
      </text>

      {/* pv */}
      <g className="text-foreground">
        <rect
          x="510"
          y="360"
          width="250"
          height="70"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </g>
      <text
        x="635"
        y="390"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="15"
        fontWeight="600"
      >
        pv
      </text>
      <text
        x="635"
        y="410"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="11"
      >
        PV 마운트
      </text>

      {/* dist 폴더 생성 → Pod (nginx) */}
      <line
        x1="230"
        y1="179"
        x2="508"
        y2="240"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        markerEnd="url(#admin-arrow)"
      />

      {/* dist 결과물 → pv (저장) */}
      <g className="text-accent">
        <line
          x1="230"
          y1="421"
          x2="508"
          y2="396"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#admin-arrow)"
        />
      </g>
      <text
        x="370"
        y="400"
        textAnchor="middle"
        className="fill-foreground"
        fontSize="12"
        fontWeight="500"
      >
        저장
      </text>

      {/* Pod → pv 마운트 */}
      <g className="text-accent">
        <line
          x1="635"
          y1="297"
          x2="635"
          y2="358"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd="url(#admin-arrow)"
        />
      </g>
      <text
        x="648"
        y="332"
        className="fill-muted-foreground"
        fontSize="11"
        fontFamily="monospace"
      >
        /usr/share/nginx/html
      </text>

      {/* pv 경로 */}
      <text
        x="40"
        y="500"
        className="fill-muted-foreground"
        fontSize="10"
        fontFamily="monospace"
      >
        pv 경로:
        /var/lib/rancher/k3s/storage/pvc-82befe59-3a3e-4d0c-8d96-d239a754d74c_scm_acm-admin-pvc
      </text>
    </svg>
  );
}
