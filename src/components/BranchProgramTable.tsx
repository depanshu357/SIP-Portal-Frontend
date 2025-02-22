import React, { useState } from 'react'

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { branchList, programList, ineligibleCombList as ineligibleCombinations } from '@/data/profileRealtedInfo'
type Props = {selectedCombinations: Set<string>, setSelectedCombinations: React.Dispatch<React.SetStateAction<Set<string>>>}

const BranchProgramTable = ({selectedCombinations, setSelectedCombinations}: Props) => {
//   const [selectedCombinations, setSelectedCombinations] = useState<Set<string>>(new Set())
  const isEligible = (branch: string, program: string) => {
    const ineligible = ineligibleCombinations.find((item) => item.branch === branch && item.programs.includes(program))
    return !ineligible ? true : false
  }

  const toggleCombination = (branch: string, program: string) => {
    if (!isEligible(branch, program)) return
    setSelectedCombinations((prev) => {
      const newSet = new Set(prev)
      const key = `${branch}-${program}`
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  const toggleWholeProgram = (program: string) => {
    setSelectedCombinations((prev) => {
      const newSet = new Set(prev)
      const eligibleBranches = branchList.filter((branch) => isEligible(branch, program))
      const allSelected = eligibleBranches.every((branch) => prev.has(`${branch}-${program}`))
      eligibleBranches.forEach((branch) => {
        const key = `${branch}-${program}`
        if (allSelected) {
          newSet.delete(key)
        } else {
          newSet.add(key)
        }
      })
      return newSet
    })
  }

  const toggleWholeBranch = (branch: string) => {
    setSelectedCombinations((prev) => {
      const newSet = new Set(prev)
      const eligiblePrograms = programList.filter((program) => isEligible(branch, program))
      const allSelected = eligiblePrograms.every((program) => prev.has(`${branch}-${program}`))
      eligiblePrograms.forEach((program) => {
        const key = `${branch}-${program}`
        if (allSelected) {
          newSet.delete(key)
        } else {
          newSet.add(key)
        }
      })
      return newSet
    })
  }
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Branch and Program Eligibility</h2>
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
                <Checkbox
                  checked={branchList
                    .filter((branch) => isEligible(branch, program))
                    .every((branch) => selectedCombinations.has(`${branch}-${program}`))}
                  onCheckedChange={() => toggleWholeProgram(program)}
                  className="mt-1"
                />
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
                <Checkbox
                  checked={programList
                    .filter((program) => isEligible(branch, program))
                    .every((program) => selectedCombinations.has(`${branch}-${program}`))}
                  onCheckedChange={() => toggleWholeBranch(branch)}
                  className="ml-2"
                />
                  </div>
                </td>
                {programList.map((program) => (
                  <td key={`${branch}-${program}`} className="p-2 border border-emerald-300">
                <div className="flex justify-center">
                  {isEligible(branch, program) ? (
                    <Checkbox
                      checked={selectedCombinations.has(`${branch}-${program}`)}
                      onCheckedChange={() => toggleCombination(branch, program)}
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
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

export default BranchProgramTable