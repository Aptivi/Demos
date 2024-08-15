using System.Threading.Tasks;
using Textify.Data.Analysis.NameGen;

namespace Demos.Data
{
	public class NamerService
	{
		public static async Task<string[]> GetNames(NamerSettings namerSettings)
		{
			return await NameGenerator.GenerateNamesAsync(
					namerSettings.NameCount,
					namerSettings.NameStartsWith,
					namerSettings.NameEndsWith,
					namerSettings.SurnameStartsWith,
					namerSettings.SurnameEndsWith
				);
		}

		public static async Task<string[]> GetFirstNames(NamerSettings namerSettings)
		{
			return await NameGenerator.GenerateFirstNamesAsync(
					namerSettings.NameCount,
					namerSettings.NameStartsWith,
					namerSettings.NameEndsWith
				);
		}

		public static async Task<string[]> GetLastNames(NamerSettings namerSettings)
		{
			return await NameGenerator.GenerateLastNamesAsync(
					namerSettings.NameCount,
					namerSettings.SurnameStartsWith,
					namerSettings.SurnameEndsWith
				);
		}

		public static async Task<string[]> FindNames(NamerFinderSettings namerSettings)
		{
			return await NameGenerator.FindFirstNamesAsync(
					namerSettings.NameSearchTerm,
					namerSettings.NameStartsWith,
					namerSettings.NameEndsWith
				);
		}

		public static async Task<string[]> FindSurnames(NamerFinderSettings namerSettings)
		{
			return await NameGenerator.FindLastNamesAsync(
					namerSettings.SurnameSearchTerm,
					namerSettings.SurnameStartsWith,
					namerSettings.SurnameEndsWith
				);
		}
	}
}
