import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'

import { programList, branchList, ineligibleCombList as ineligibleCombinations } from '@/data/profileRealtedInfo'

type Props = {eligibility: string[] | null}

const BranchProgramDisplayTable = ({eligibility}: Props) => {
  if (eligibility === null) return <></>
  const isEligible = (branch: string, program: string) => {
      const ineligible = ineligibleCombinations.find((item) => item.branch === branch && item.programs.includes(program))
      return !ineligible ? true : false
    }
  const renderEmoji = (branch: string, program: string) => {
    if(!isEligible(branch, program)) return "-"
    if(eligibility?.includes(`${branch}-${program}`)) return "✅"
    else return "❌"
  }
  return (
    <div className="mt-4">
      <h2 className="text-md font-bold mb-2">Branch and Program Eligibility</h2>
      <div className="overflow-x-auto">
        <ScrollArea className="rounded-md border border-emerald-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-emerald-100 z-10">
            <tr>
              <th className="p-2 border border-emerald-300 bg-emerald-100 text-emerald-800 min-w-[120px]">
                Branch / Program
              </th>
              {programList.map((program) => (
                <th
                  key={program}
                  className="p-2 border border-emerald-300 bg-emerald-100 text-emerald-800 min-w-[80px]"
                >
                  <div className="flex flex-col items-center">
                <span className="mb-2">{program}</span>
                
                  </div>
                </th>
              ))}
            </tr>
              </thead>
              <tbody>
            {branchList.map((branch) => (
              <tr key={branch}>
                <td className="p-2 border border-emerald-300 bg-emerald-50 text-emerald-800 font-medium sticky left-0 z-10">
                  <div className="flex items-center justify-between">
                <span>{branch}</span>
                
                  </div>
                </td>
                {programList.map((program) => (
                  <td key={`${branch}-${program}`} className="p-2 border border-emerald-300">
                <div className="flex justify-center">
                  {renderEmoji(branch, program)}
                </div>
                  </td>
                ))}
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default BranchProgramDisplayTable