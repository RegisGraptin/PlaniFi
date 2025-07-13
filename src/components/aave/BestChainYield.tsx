export default function BestChainYield({
  chainId,
  apr,
}: {
  chainId: number | null;
  apr: string;
}) {
  if (!chainId) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-5">
          <div className="flex justify-between items-start">
            {/* Left Column - Chain & TVL */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{chainId}</h2>
            </div>

            {/* Right Column - APR */}
            <div className="text-right">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                APR
              </div>
              <div
                className={`mt-1 text-xl font-bold ${
                  apr ? "text-green-600" : "text-gray-400"
                }`}
              >
                {apr || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator Bar */}
        <div
          className={`h-1 w-full ${
            apr
              ? parseFloat(apr) > 5
                ? "bg-green-500"
                : "bg-blue-500"
              : "bg-gray-300"
          }`}
        />
      </div>
    </>
  );
}
