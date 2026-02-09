using Microsoft.AspNetCore.Components;

namespace Demos.Data
{
    public class FeatureDescriptor
    {
        public string IconClass { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public (EventCallback, string, bool disabled)[] Buttons { get; set; }
    }
}
