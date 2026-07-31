/**
 * The whole idea, drawn once in outline and left in the background at almost
 * nothing.
 *
 * A small crown of peaks above the waterline and a far larger mass below it.
 * Line work rather than fill, so it reads as a drawing behind the page instead
 * of an object floating in the water. It drifts upward as you scroll, so
 * descending uncovers more of what is underneath.
 */
export function IcebergSilhouette() {
  return (
    <svg
      viewBox="0 0 1000 1600"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* The tip */}
        <path d="M286,430 L372,296 L418,352 L500,168 L566,318 L628,262 L714,430" />

        {/* The mass */}
        <path d="M198,430 L166,528 L206,672 L262,880 L326,1092 L398,1288 L452,1440 L486,1536 L524,1452 L596,1318 L690,1140 L764,948 L836,742 L868,560 L802,430" />

        {/* Interior facets, fainter, so the volume reads */}
        <g strokeOpacity="0.45">
          <path d="M500,168 L500,430" />
          <path d="M418,352 L500,430 L566,318" />
          <path d="M500,430 L486,1536" />
          <path d="M802,430 L690,1140" />
          <path d="M198,430 L398,1288" />
        </g>
      </g>

      {/* Where it meets the water, running past the berg on both sides */}
      <path
        d="M60,430 L940,430"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
