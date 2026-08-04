interface BaganNode {
  position: string;
  name?: string;
  children?: BaganNode[];
}

function Node({ node }: { node: BaganNode }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white border-2 border-primary rounded-lg px-4 py-2 text-center shadow-sm min-w-[140px] max-w-[200px]">
        <p className="font-semibold text-sm text-foreground leading-snug">{node.position}</p>
        {node.name && <p className="text-xs text-muted mt-0.5">{node.name}</p>}
      </div>

      {hasChildren && (
        <div className="mt-1 w-full">
          <div className="relative flex">
            <div className="absolute left-[8%] right-[8%] top-0 border-t-2 border-gray-300" />
            {node.children!.map((child, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-0.5 h-4 bg-gray-300" />
                <div className="flex flex-col items-center">
                  <Node node={child} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StrukturChart({ root }: { root: BaganNode }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[560px]">
        <Node node={root} />
      </div>
    </div>
  );
}